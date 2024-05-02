import {WhatsappService} from "./baileys.facade.interface";
import UseCaseInterface from "../../@shared/application/use-case/use-case.interface";
import {GetInfoUseCaseDTO} from "../usecase/instance/get-info/get-instance-info.dto";
import {GetQrCodeUseCaseInputDTO} from "../usecase/instance/get-qr-code/get-qr-code.usecase.dto";
import {DeleteInstanceUseCaseDto} from "../usecase/instance/delete/delete-instance.usecase.dto";
import {SendTextMessageUseCaseDto} from "../usecase/message/send-text-message/send-text-message.dto";
import {SendUrlMediaFileUseCaseDto} from "../usecase/message/send-url-media-file/send-url-media-file.usecase.dto";
import {InitInstanceDto} from "../usecase/instance/init/init-instance.dto";

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

export class BaileysFacade implements WhatsappService {
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
    info(input: GetInfoUseCaseDTO){
        return this._infoUseCase.execute(input)
    }
    qr(input: GetQrCodeUseCaseInputDTO){
        return this._qrUseCase.execute(input)
    }
    logout(input:LogoutInstanceUseCaseDto){
        return this._logoutUseCase.execute(input)
    }
    delete(input: DeleteInstanceUseCaseDto){
        return this._deleteUseCase.execute(input)
    }
    sendTextMessage(input:SendTextMessageUseCaseDto){
        return this._sendTextMessageUseCase.execute(input)
    }
    sendUrlMediaFile(input: SendUrlMediaFileUseCaseDto){
        return this._sendUrlMediaFileUseCase.execute(input)
    }
    sendMediaFile(input:SendMediaFileUseCaseDto){
        return this._sendMediaFileUseCase.execute(input)
    }

}