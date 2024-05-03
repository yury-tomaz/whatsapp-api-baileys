import {ControllerInterface} from "../../interfaces/controller.interface";
import {HttpRequest} from "../../http-types/http-request";

interface ControllersProps{
    init: ControllerInterface;
    // info: ControllerInterface;
    // qr: ControllerInterface;
    // logout: ControllerInterface;
    // delete: ControllerInterface;
    // sendTextMessage: ControllerInterface;
    // sendUrlMediaFile: ControllerInterface;
    // sendMediaFile: ControllerInterface;
}

export class BaileysControllerFacade {
    private readonly _init: ControllerInterface;
    // private readonly _info: ControllerInterface;
    // private readonly _qr: ControllerInterface;
    // private readonly _logout: ControllerInterface;
    // private readonly _delete: ControllerInterface;
    // private readonly _sendTextMessage: ControllerInterface;
    // private readonly _sendUrlMediaFile: ControllerInterface;
    // private readonly _sendMediaFile: ControllerInterface;
    constructor(props: ControllersProps) {
        this._init = props.init;
        // this._info = props.info;
        // this._qr = props.qr;
        // this._logout = props.logout;
        // this._delete = props.delete;
        // this._sendTextMessage = props.sendTextMessage;
        // this._sendUrlMediaFile = props.sendUrlMediaFile;
        // this._sendMediaFile = props.sendMediaFile;
    }
    init(request: HttpRequest){
        return this._init.handle(request)
    }
    // info(request: HttpRequest){
    //     return this._info.handle(request)
    // }
    // qr(request: HttpRequest){
    //     return this._qr.handle(request)
    // }
    // logout(request: HttpRequest){
    //     return this._logout.handle(request)
    // }
    // delete(request: HttpRequest){
    //     return this._delete.handle(request)
    // }
    // sendTextMessage(request: HttpRequest){
    //     return this._sendTextMessage.handle(request)
    // }
    // sendUrlMediaFile(request: HttpRequest){
    //     return this._sendUrlMediaFile.handle(request)
    // }
    // sendMediaFile(request: HttpRequest){
    //     return this._sendMediaFile.handle(request)
    // }
}