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
    private _status: string = '';
    private _profilePicture: string = '';
    private _title: string;
    private _phoneNumber: string = '';
    private _isOnly: boolean = false;

    constructor(props: WhatsappProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._title = props.title;
    }

    get status() {
        return this._status;
    }
    get profilePicture() {
        return this._profilePicture;
    }
    get title() {
        return this._title
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    get isOnly() {
        return this._isOnly
    }

    set status(NewStatus: string) {
        this._status = NewStatus
    }
    set profilePicture(fileName: string) {
        this._profilePicture = fileName
    }
    set title(newTitle: string) {
         this._title = newTitle
    }
    set phoneNumber(newPhoneNumber:string) {
        this._phoneNumber = newPhoneNumber
    }
    set isOnly(only: boolean) {
         this._isOnly = only
    }
}