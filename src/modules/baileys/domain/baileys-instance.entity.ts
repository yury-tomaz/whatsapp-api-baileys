import BaseEntity from '../../@shared/domain/entities/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

interface Props {
  id?: Id;
  sessionId: string;
  name: string;
  belongsTo: string;
  routingKey: string;
  createdAt?: string;
  updatedAt?: string;
}
export class BaileysInstance extends BaseEntity {
  private readonly _sessionId: string;
  private readonly _name: string;
  private readonly _belongsTo: string;
  private readonly _routingKey: string;

  constructor(props: Props) {
    super(props.id);
    this._sessionId = props.sessionId;
    this._name = props.name;
    this._belongsTo = props.belongsTo;
    this._routingKey = props.routingKey;
  }

  get sessionId() {
    return this._sessionId;
  }
  get name() {
    return this._name;
  }
  get belongsTo() {
    return this._belongsTo;
  }
  get routingKey() {
    return this._routingKey;
  }
}
