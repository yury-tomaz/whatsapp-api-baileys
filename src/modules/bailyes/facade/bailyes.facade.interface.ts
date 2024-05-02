import {InitInstanceDto} from "../usecase/instance/init/init-instance.dto";
import {GetInfoUseCaseDTO} from "../usecase/instance/get-info/get-instance-info.dto";
import {GetQrCodeUseCaseDTO} from "../usecase/instance/get-qr-code/get-qr-code.usecase.dto";
import {DeleteInstanceUseCaseDto} from "../usecase/instance/delete/delete-instance.usecase.dto";
import {SendTextMessageUseCaseDto} from "../usecase/message/send-text-message/send-text-message.dto";
import {SendUrlMediaFileUseCaseDto} from "../usecase/message/send-url-media-file/send-url-media-file.usecase.dto";
import { CreateGroupDto } from "../usecase/group/create-group/create-group.dto";
import { LeaveGroupDto } from "../usecase/group/leave-group/leave-group.dto";
import { InviteCodeGroupDto } from "../usecase/group/invite-code-group/invite-code-group.dto";
import { UpdateSubjectGroupDto } from "../usecase/group/update-subject-group/update-subject-group.dto";
import { UpdateDescriptionGroupDto } from "../usecase/group/update-description-group/update-description-group.dto";
import { AcceptInviteGroupDto } from "../usecase/group/accept-invite-group/accept-invite-group.dto";
import { IsOnWhatsappDto } from "../usecase/misc/is-on-whatsapp/is-on-whatsapp.dto";
import { BlockUnblockUserDto } from "../usecase/misc/block-unblock-user/block-unblock-user.dto";
import { GetUserStatusDto } from "../usecase/misc/get-status-user/get-status-user.dto";
import { GetProfilePictureDto } from "../usecase/misc/get-profile-picture/get-profile-picture.dto";
import { UpdateProfilePictureDto } from "../usecase/misc/update-profile-picture/update-profile-picture.dto";
import { MakeUserGroupDto } from "../usecase/group/make-user-group/make-user-group.dto";
import { UpdateSettingsGroupDto } from "../usecase/group/update-settings-group/update-settings-group.dto";

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
    createNewGroup(input: CreateGroupDto): Promise<any>;
    //getAllGroups(): Promise<void>;
    leaveGroup(input: LeaveGroupDto): Promise<any>;
    getInviteCodeGroup(input: InviteCodeGroupDto): Promise<any>;
    makeUserGroup(input: MakeUserGroupDto): Promise<any>;
    //getInstanceInviteCodeGroup(): Promise<void>;
    //groupFetchAllParticipating(): Promise<void>;
    groupSettingUpdate(input: UpdateSettingsGroupDto): Promise<void>;
    groupUpdateSubject(input: UpdateSubjectGroupDto): Promise<any>;
    groupUpdateDescription(input: UpdateDescriptionGroupDto): Promise<any>;
    //groupGetInviteInfo(): Promise<void>;
    groupAcceptInvite(input: AcceptInviteGroupDto): Promise<any>;
}

interface MiscService {
    verifyId(input: IsOnWhatsappDto): Promise<any>;
    downloadProfile(input: GetProfilePictureDto): Promise<any>;
    getUserStatus(input: GetUserStatusDto): Promise<any>;
    blockUnblock(input: BlockUnblockUserDto): Promise<any>;
    updateProfilePicture(input: UpdateProfilePictureDto): Promise<any>;
    // getUserOrGroupById(): Promise<void>;
}

// TODO: implement 'MiscService' and GroupService
export interface WhatsappService extends  MessageService,  InstanceService, GroupService, MiscService {}