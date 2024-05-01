import {InitInstanceDto} from "../usecase/instance/init/init-instance.dto";
import {GetInfoUseCaseDTO} from "../usecase/instance/get-info/get-instance-info.dto";
import {GetQrCodeUseCaseDTO} from "../usecase/instance/get-qr-code/get-qr-code.usecase.dto";
import {DeleteInstanceUseCaseDto} from "../usecase/instance/delete/delete-instance.usecase.dto";
import {SendTextMessageUseCaseDto} from "../usecase/message/send-text-message/send-text-message.dto";
import {SendUrlMediaFileUseCaseDto} from "../usecase/message/send-url-media-file/send-url-media-file.usecase.dto";

interface InstanceService {
    init(input: InitInstanceDto): Promise<void>;
    info(input: GetInfoUseCaseDTO): Promise<void>;
    qr(input: GetQrCodeUseCaseDTO): Promise<void>;
    logout(input: LogoutInstanceUseCaseDto): Promise<void>;
    delete(input: DeleteInstanceUseCaseDto): Promise<void>;
}

interface MessageService {
    sendTextMessage(input: SendTextMessageUseCaseDto): Promise<void>;
    sendUrlMediaFile(input: SendUrlMediaFileUseCaseDto): Promise<void>;
    sendMediaFile(input: SendMediaFileUseCaseDto): Promise<void>;
}

interface GroupService {
    createNewGroup(): Promise<void>;
    addNewParticipant(): Promise<void>;
    makeAdmin(): Promise<void>;
    demoteAdmin(): Promise<void>;
    getAllGroups(): Promise<void>;
    leaveGroup(): Promise<void>;
    getInviteCodeGroup(): Promise<void>;
    getInstanceInviteCodeGroup(): Promise<void>;
    groupFetchAllParticipating(): Promise<void>;
    groupParticipantsUpdate(): Promise<void>;
    groupSettingUpdate(): Promise<void>;
    groupUpdateSubject(): Promise<void>;
    groupUpdateDescription(): Promise<void>;
    groupGetInviteInfo(): Promise<void>;
    groupAcceptInvite(): Promise<void>;
}

interface MiscService {
    verifyId(): Promise<void>;
    downloadProfile(): Promise<void>;
    getUserStatus(): Promise<void>;
    blockUnblock(): Promise<void>;
    updateProfilePicture(): Promise<void>;
    getUserOrGroupById(): Promise<void>;
}

// TODO: implement 'MiscService' and GroupService
export interface WhatsappService extends  MessageService,  InstanceService {}