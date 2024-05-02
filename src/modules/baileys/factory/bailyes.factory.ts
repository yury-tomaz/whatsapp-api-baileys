import {BaileysFacade} from "../facade/baileysFacade";
import {InitInstanceUseCase} from "../usecase/instance/init/init-instance.usecase";

import {ProcessSocketEvent} from "../domain/process-socket-event";
import {BaileysInstanceRepositoryInMemory} from "../repository/baileys-instance-repository-in-memory";
import {GetQrCodeUsecase} from "../usecase/instance/get-qr-code/get-qr-code.usecase";
import {DeleteInstanceUseCase} from "../usecase/instance/delete/delete-instance.useCase";
import {SendTextMessageUseCase} from "../usecase/message/send-text-message/send-text-message.useCase";
import {SendUrlMediaFileUseCase} from "../usecase/message/send-url-media-file/send-url-media-file.useCase";
import EventDispatcher from "../../@shared/domain/events/event-dispatcher";
import {GetInfoUseCase} from "../usecase/instance/get-info/get-info.usecase";
import {LogoutInstanceUseCase} from "../usecase/instance/logout/logout-instance-usecase";
import {SendMediaFileUseCase} from "../usecase/message/send-media-file/send-media-file.usecase";
import {AuthStateRepository} from "../../bailyes/repository/auth-state-repository";

export class BailyesFactory {
    static create(){
        const eventDispatcher = new EventDispatcher();
        const authStateRepository = new AuthStateRepository();
        const baileysManager =  BaileysInstanceRepositoryInMemory.getInstance();
        const processSocketEvent = new ProcessSocketEvent(baileysManager);

        const initUseCase = new InitInstanceUseCase(
            eventDispatcher, authStateRepository,
            processSocketEvent, baileysManager,
        );
        const infoUseCase = new GetInfoUseCase(baileysManager);
        const qrUseCase = new GetQrCodeUsecase(baileysManager);
        const logoutUseCase = new LogoutInstanceUseCase(baileysManager);
        const deleteUseCase = new DeleteInstanceUseCase(baileysManager);
        const sendTextMessageUseCase = new SendTextMessageUseCase(baileysManager);
        const sendUrlMediaFileUseCase = new SendUrlMediaFileUseCase(baileysManager);
        const sendMediaFileUseCase = new SendMediaFileUseCase(baileysManager);

        return new BaileysFacade({
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