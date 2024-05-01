import {WhatsappService} from "./bailyes.facade.interface";
import UseCaseInterface from "../../@shared/application/use-case/use-case.interface";
import {
    AcceptInviteGroupDto,
    InitInstanceDto
} from "./bailyes.facade.dto";

export interface UseCasesProps {
    initUseCase: UseCaseInterface;
    infoUseCase: UseCaseInterface;
    qrUseCase: UseCaseInterface;
    logoutUseCase: UseCaseInterface;
    deleteUseCase: UseCaseInterface;
    sendTextMessageUseCase: UseCaseInterface;
    sendUrlMediaFileUseCase: UseCaseInterface;
    sendMediaFileUseCase: UseCaseInterface;
}

export class BailyesServiceFacade implements WhatsappService {
    _initUseCase: UseCaseInterface;
    _infoUseCase: UseCaseInterface;
    _qrUseCase: UseCaseInterface;
    _logoutUseCase: UseCaseInterface;
    _deleteUseCase: UseCaseInterface;
    _sendTextMessageUseCase: UseCaseInterface;
    _sendUrlMediaFileUseCase: UseCaseInterface;
    _sendMediaFileUseCase: UseCaseInterface;
    constructor(props: UseCasesProps) {
        this._initUseCase = props.initUseCase;
        this._infoUseCase = props.infoUseCase;
        this._qrUseCase = props.qrUseCase;
        this._logoutUseCase = props.logoutUseCase;
        this._deleteUseCase = props.deleteUseCase;
        this._sendTextMessageUseCase = props.sendTextMessageUseCase;
        this._sendUrlMediaFileUseCase = props.sendUrlMediaFileUseCase;
        this._sendMediaFileUseCase = props.sendMediaFileUseCase;
    }

    init(input: InitInstanceDto){
        return this._initUseCase.execute(input)
    }
    info(input: any){
        return this._infoUseCase.execute(input)
    }
    qr(input: any){
        return this._qrUseCase.execute(input)
    }
    logout(input:any){
        return this._logoutUseCase.execute(input)
    }
    delete(input: any){
        return this._deleteUseCase.execute(input)
    }
    sendTextMessage(input:any){
        return this._sendTextMessageUseCase.execute(input)
    }
    sendUrlMediaFile(input: any){
        return this._sendUrlMediaFileUseCase.execute(input)
    }
    sendMediaFile(input:any){
        return this._sendMediaFileUseCase.execute(input)
    }

}