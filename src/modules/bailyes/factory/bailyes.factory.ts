import {BailyesServiceFacade} from "../facade/bailyes-service.facade";
import {InitInstanceUsecase} from "../usecase/instance/init/init-instance.usecase";
import {AuthStateRepository} from "../repository/auth-state-repository";
import {ProcessSocketEvent} from "../domain/process-socket-event";
import {BaileysInstanceRepositoryInMemory} from "../repository/baileys-instance-repository-in-memory";
import {GetQrCodeUsecase} from "../usecase/instance/get-qr-code/get-qr-code.usecase";
import {GetInfoUsecase} from "../usecase/instance/get-info/get-info.usecase";
import {LogoutInstanceUsecase} from "../usecase/instance/logout/logout-instance-usecase";
import {DeleteInstanceUseCase} from "../usecase/instance/delete/delete-instance.useCase";
import {SendTextMessageUseCase} from "../usecase/message/send-text-message/send-text-message.useCase";
import {SendUrlMediaFileUseCase} from "../usecase/message/send-url-media-file/send-url-media-file.useCase";
import {SendMediaFileUsecase} from "../usecase/message/send-media-file/send-media-file.usecase";
import {AcceptInviteGroupUseCase} from "../usecase/group/accept-invite-group/accept-invite-group.useCase";
import EventDispatcher from "../../@shared/domain/events/event-dispatcher";

export class BailyesFactory {
    static create(){
        const eventDispatcher = new EventDispatcher();
        const authStateRepository = new AuthStateRepository();
        const baileysManager =  BaileysInstanceRepositoryInMemory.getInstance();
        const processSocketEvent = new ProcessSocketEvent(baileysManager);

        const initUseCase = new InitInstanceUsecase(
            eventDispatcher, authStateRepository,
            processSocketEvent, baileysManager,
        );
        const infoUseCase = new GetInfoUsecase(baileysManager);
        const qrUseCase = new GetQrCodeUsecase(baileysManager);
        const logoutUseCase = new LogoutInstanceUsecase(baileysManager);
        const deleteUseCase = new DeleteInstanceUseCase(baileysManager);
        const sendTextMessageUseCase = new SendTextMessageUseCase(baileysManager);
        const sendUrlMediaFileUseCase = new SendUrlMediaFileUseCase(baileysManager);
        const sendMediaFileUseCase = new SendMediaFileUsecase(baileysManager);

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