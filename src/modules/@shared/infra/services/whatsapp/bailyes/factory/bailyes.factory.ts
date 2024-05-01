import {BailyesServiceFacade} from "../facade/bailyes-service.facade";
import {InitInstanceUseCase} from "../usecase/instance/init/init-instance.useCase";
import EventDispatcher from "../../../../../domain/events/event-dispatcher";
import {AuthStateRepository} from "../repository/auth-state-repository";
import {ProcessSocketEvent} from "../process-socket-event";
import {BaileysManager} from "../baileys-manager";
import {GetQrCodeUseCase} from "../usecase/instance/get-qr-code/get-qr-code.useCase";
import {GetInfoUseCase} from "../usecase/instance/get-info/get-info.useCase";
import {LogoutInstanceUseCase} from "../usecase/instance/logout/logout-instance-use.case";
import {DeleteInstanceUseCase} from "../usecase/instance/delete/delete-instance.useCase";
import {SendTextMessageUseCase} from "../usecase/message/send-text-message/send-text-message.useCase";
import {SendUrlMediaFileUseCase} from "../usecase/message/send-url-media-file/send-url-media-file.useCase";
import {SendMediaFileUseCase} from "../usecase/message/send-media-file/send-media-file.useCase";

export class BailyesFactory {
    static create(){
        const eventDispatcher = new EventDispatcher();
        const authStateRepository = new AuthStateRepository();
        const baileysManager =  BaileysManager.getInstance();
        const processSocketEvent = new ProcessSocketEvent(baileysManager);

        const initUseCase = new InitInstanceUseCase(
            eventDispatcher, authStateRepository,
            processSocketEvent, baileysManager,
        );
        const infoUseCase = new GetInfoUseCase(baileysManager);
        const qrUseCase = new GetQrCodeUseCase(baileysManager);
        const logoutUseCase = new LogoutInstanceUseCase(baileysManager);
        const deleteUseCase = new DeleteInstanceUseCase(baileysManager);
        const sendTextMessageUseCase = new SendTextMessageUseCase(baileysManager);
        const sendUrlMediaFileUseCase = new SendUrlMediaFileUseCase(baileysManager);
        const sendMediaFileUseCase = new SendMediaFileUseCase(baileysManager);

        return new BailyesServiceFacade({
            initUseCase,
            infoUseCase,
            qrUseCase,
            logoutUseCase,
            deleteUseCase,
            sendTextMessageUseCase,
            sendUrlMediaFileUseCase,
            sendMediaFileUseCase,
        });
    }
}