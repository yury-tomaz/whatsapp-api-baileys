import BaseEntity from "../../@shared/domain/entities/base.entity";
import AggregateRoot from "../../@shared/domain/entities/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

interface WhatsappProps {
    id?: Id;
    title: string
    createdAt?: Date;
    updatedAt?: Date;
}

export class Whatsapp extends BaseEntity implements AggregateRoot {
    private _title: string;
    private _status: string = '';

    constructor(props: WhatsappProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._title = props.title;
    }

    get status() {
        return this._status;
    }
    get title() {
        return this._title
    }

    set status(NewStatus: string) {
        this._status = NewStatus
    }

    set title(newTitle: string) {
         this._title = newTitle
    }
}