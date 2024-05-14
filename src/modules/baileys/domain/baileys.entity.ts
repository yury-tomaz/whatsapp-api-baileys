import makeWASocket, {
  AuthenticationState,
  BaileysEventMap,
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  SocketConfig, useMultiFileAuthState,
  WABrowserDescription,
  WAMessage,
} from '@whiskeysockets/baileys';
import MAIN_LOGGER from '@whiskeysockets/baileys/lib/Utils/logger';
import { Chat } from '@whiskeysockets/baileys/lib/Types/Chat';
import { ProcessSocketEvent } from './process-socket-event';
import BaseEntity from '../../@shared/domain/entities/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import AggregateRoot from '../../@shared/domain/entities/aggregate-root.interface';
import { logger } from '../../@shared/infra/logger';
import { AppError, HttpCode } from '../../@shared/domain/exceptions/app-error';
import { AuthStateRepositoryInterface } from '../gateway/auth-state-repository.interface';
import { Collection } from 'mongodb';
import { mongoClient } from '../../@shared/infra/persistence/settings/connection';
import { useMultiFileAuthStateDb } from '../helpers/auth-state-db';

const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = 'error';

interface CustomSocketConfig extends Partial<SocketConfig> {
  auth: AuthenticationState;
  browser: WABrowserDescription;
}

interface Props {
  id?: Id;
  belongsTo?: string;
  name: string;
  authStateRepository: AuthStateRepositoryInterface;
  processSocketEvent: ProcessSocketEvent;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Baileys extends BaseEntity implements AggregateRoot {
  private readonly _belongsTo: string | undefined;
  private readonly _name: string;
  private _socketConfig: CustomSocketConfig | undefined;
  private readonly _collection: Collection;
  private _waSocket?: ReturnType<typeof makeWASocket>;
  private _qrRetry = 0;
  private _qr?: string;
  private _qrCode: string | undefined;
  private _chats: Chat[] = [];
  private _messages: WAMessage[] = [];
  private _isOn: boolean = false;
  private eventProcessor: ProcessSocketEvent;

  get name(): string {
    return this._name;
  }

  get collection(){
    return this._collection
  }

  get belongsTo(): string | undefined {
    return this._belongsTo;
  }

  get qrCode() {
    return this._qrCode;
  }

  get waSocket():  ReturnType<typeof makeWASocket> | undefined{
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

  set qr(value: string) {
    this._qr = value;
  }

  get qrRetry() {
    return this._qrRetry;
  }

  get chats(): Chat[] {
    return this._chats;
  }

  set chats(value: Chat[]) {
    this._chats = value;
  }

  get messages() {
    return this._messages;
  }

  set messages(value: any) {
    this._messages = value;
  }

  constructor(props: Props) {
    super(props.id);
    this.eventProcessor = props.processSocketEvent;
    this._belongsTo = props.belongsTo;
    this._name = props.name;
    this._collection = mongoClient
      .db('whatsapp-api')
      .collection(`session-${this.id.id}`);

    this.init().then((r) => {
      logger.info('Baileys instance initialized');
    });
  }

  async init() {
    const store = makeInMemoryStore({
      logger: loggerBaileys,
    });
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthStateDb(this._collection)

    this._socketConfig = {
      version,
      logger: loggerBaileys,
      printQRInTerminal: true,
      browser: Browsers.ubuntu('Chrome'),
      auth: state,
    };

    this._waSocket = makeWASocket(this._socketConfig);
    store.bind(this._waSocket.ev);

    if (this._waSocket) {
      this._waSocket.ev.on('creds.update', saveCreds);
      await this.eventProcessor.execute(this);
    }
  }

  closeWebSocketConnection() {
    this._waSocket?.ws.close();
    this.removeAllListeners();
    this._qr = undefined;
  }

  public removeAllListeners() {
    const sock = this._waSocket;
    if (!sock) return;

    const events: (keyof BaileysEventMap)[] = [
      'connection.update',
      'creds.update',
      'messaging-history.set',
      'chats.upsert',
      'chats.update',
      'chats.delete',
      'presence.update',
      'contacts.upsert',
      'contacts.update',
      'messages.delete',
      'messages.update',
      'messages.media-update',
      'messages.upsert',
      'messages.reaction',
      'message-receipt.update',
      'groups.upsert',
      'groups.update',
      'group-participants.update',
      'blocklist.set',
      'blocklist.update',
      'call',
      'labels.edit',
      'labels.association',
    ];
    events.forEach((event) => {
      sock.ev.removeAllListeners(event);
    });
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
