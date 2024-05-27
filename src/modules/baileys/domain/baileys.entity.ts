import makeWASocket, {
  AuthenticationState,
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  SocketConfig,
  WABrowserDescription,
} from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import MAIN_LOGGER from '@whiskeysockets/baileys/lib/Utils/logger';
import BaseEntity from '../../@shared/domain/entities/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import AggregateRoot from '../../@shared/domain/entities/aggregate-root.interface';
import { logger } from '../../@shared/infra/logger';
import { AppError, HttpCode } from '../../@shared/domain/exceptions/app-error';
import { Store } from '../events/store';
import { Boom } from '@hapi/boom';
import { mongoDBManager } from '../../@shared/infra/persistence/settings/connection';
import { useMultiFileAuthStateDb } from '../helpers/auth-state-db';
import { Collection } from 'mongodb';
import { eventDispatcher } from '../../../main/server/server';
import { EventOccurredWhatsappEvent } from '../events/event-occurred-whatsapp.event';
import { Config } from '../../@shared/infra/config';

const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = 'error';

interface CustomSocketConfig extends Partial<SocketConfig> {
  auth: AuthenticationState;
  browser: WABrowserDescription;
}

interface Props {
  id?: Id;
  sessionId: string;
  name: string;
  belongsTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Baileys extends BaseEntity implements AggregateRoot {
  private readonly _belongsTo: string | undefined;
  private readonly _name: string;
  private readonly _sessionId: string;
  private _store: Store;
  private _socketConfig: CustomSocketConfig | undefined;
  private _waSocket?: ReturnType<typeof makeWASocket>;
  private _qrRetry = 0;
  private _qr: string;
  private _isOn: boolean = false;
  private readonly coll: Collection;

  get name(): string {
    return this._name;
  }

  get sessionId():string{
    return this._sessionId
  }

  get belongsTo(): string | undefined {
    return this._belongsTo;
  }

  get waSocket(): ReturnType<typeof makeWASocket> | undefined {
    return this._waSocket;
  }

  get isOn() {
    return this._isOn;
  }

  set isOn(value: boolean) {
    this._isOn = value;
  }

  get qr(): string | undefined {
    return this._qr;
  }

  constructor(props: Props) {
    super(props.id);
    this._belongsTo = props.belongsTo;
    this._name = props.name;
    this._sessionId = props.sessionId;
    this.coll = mongoDBManager
      .db('sessions')
      .collection(`${this.sessionId}`);

    this.init().then(() => {
      logger.info('Baileys instance initialized');
    });
  }

  async init() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthStateDb(this.coll);

    this._socketConfig = {
      version,
      logger: loggerBaileys,
      printQRInTerminal: false,
      browser: Browsers.ubuntu('Chrome'),
      auth: state,
    };

    this._waSocket = makeWASocket(this._socketConfig);
    this._store = new Store(`${this.id.id}`, this._waSocket.ev);

    if (this._waSocket) {
      this._waSocket.ev.on('creds.update', saveCreds);

      this._waSocket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update || {};
        if (connection === 'connecting') return;

        if (connection === 'close') {
          let reason = new Boom(lastDisconnect?.error).output.statusCode;

          if (reason === DisconnectReason.badSession) {
            this._isOn = false
            await this.coll.drop();
          } else if (reason === DisconnectReason.connectionClosed) {
            await this.init();
          } else if (reason === DisconnectReason.connectionLost) {
            await this.init();
          } else if (reason === DisconnectReason.connectionReplaced) {
            logger.info('connection Replaced');
          } else if (reason === DisconnectReason.loggedOut) {
            this._isOn = false
            await this.coll.drop();
            logger.info('Device Logged Out, Please Login Again');
          } else if (reason === DisconnectReason.restartRequired) {
            console.log('Restart Required, Restarting...');
            await this.init();
          } else if (reason === DisconnectReason.timedOut) {
            console.log('Connection TimedOut, Reconnecting...');
            await this.init();
          } else {
            this._isOn = false
            await this.coll.drop();
            this._waSocket?.end(
              new Error(
                `Unknown DisconnectReason: ${reason}|${lastDisconnect!.error}`,
              ),
            );
          }

          eventDispatcher.notify(
            new EventOccurredWhatsappEvent({
              routingKey: 'baileys.event.connection.close',
              data: {
                sessionId: this._sessionId,
                connection: connection,
              },
            }),
          );
        } else if (connection === 'open') {
          logger.info('Connection open');
          const coll = mongoDBManager.db(Config.db().dbName).collection('instances');

          const alreadyThere = await coll.findOne({
            sessionId: this._sessionId
          });

          if (!alreadyThere) {
            await coll.insertOne({
              sessionId: this._sessionId,
              name: this._name,
              belongsTo: this.belongsTo,
              createdAt: this.createdAt,
              updatedAt: this.updatedAt,
              routingKey: Config.routingKey(),
            });
          }

          eventDispatcher.notify(
            new EventOccurredWhatsappEvent({
              routingKey: 'baileys.event.connection.open',
              data: {
                sessionId: this._sessionId,
                connection: connection,
              },
            }),
          );

          this._isOn = true;
        }
        if (qr) {
          this._qr = await QRCode.toDataURL(qr);

          if (this._qrRetry > 3) {
            this.closeWebSocketConnection();
            logger.info('QRCode expired');
          }
        }
      });
    }
  }

  closeWebSocketConnection() {
    this._waSocket?.ws.close();
    this._store.unlisten();
    this._qr = '';
  }

  async verifyId(id: string) {
    if (id.includes('@g.us')) return true;

    if (!this._waSocket)
      throw new AppError({
        message: 'Baileys instance not initialized',
        statusCode: HttpCode['NOT_FOUND'],
        isOperational: true,
      });

    const [result] = await this._waSocket.onWhatsApp(id);
    if (result?.exists) return true;

    throw new AppError({
      message: 'no account exists',
      statusCode: 204,
      isOperational: true,
    });
  }
}
