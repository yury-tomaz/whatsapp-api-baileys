import {
    AddNewParticipantDto, BlockUnblockDto,
    CreateNewGroupDto,
    DeleteInstanceDto,
    DemoteAdminDto, DownloadProfileDto,
    GetAllGroupsDto,
    GetInstanceInviteCodeGroupDto,
    GetInviteCodeGroupDto, GetUserOrGroupByIdDto, GetUserStatusDto, GroupAcceptInviteDto,
    GroupFetchAllParticipatingDto, GroupGetInviteInfoDto,
    GroupParticipantsUpdateDto,
    GroupSettingUpdateDto,
    GroupUpdateDescriptionDto,
    GroupUpdateSubjectDto,
    InfoInstanceDto,
    InitInstanceDto,
    LeaveGroupDto,
    logoutInstanceDto,
    MakeAdminDto,
    qrInstanceDto,
    SendMediaFileDto,
    SendTextMessageDto,
    SendUrlMediaFileDto, UpdateProfilePictureDto, VerifyIdDto
} from "./whatsapp-lib.dto";

interface InstanceService {
    init(input: InitInstanceDto): Promise<void>;
    info(input: InfoInstanceDto): Promise<void>;
    qr(input: qrInstanceDto): Promise<void>;
    logout(input: logoutInstanceDto): Promise<void>;
    delete(input: DeleteInstanceDto): Promise<void>;
}

interface MessageService {
    sendTextMessage(input: SendTextMessageDto): Promise<void>;
    sendUrlMediaFile(input: SendUrlMediaFileDto): Promise<void>;
    sendMediaFile(input: SendMediaFileDto): Promise<void>;
}

interface GroupService {
    createNewGroup(input: CreateNewGroupDto): Promise<void>;
    addNewParticipant(input: AddNewParticipantDto): Promise<void>;
    makeAdmin(input: MakeAdminDto): Promise<void>;
    demoteAdmin(input: DemoteAdminDto): Promise<void>;
    getAllGroups(input: GetAllGroupsDto): Promise<void>;
    leaveGroup(input: LeaveGroupDto): Promise<void>;
    getInviteCodeGroup(input: GetInviteCodeGroupDto): Promise<void>;
    getInstanceInviteCodeGroup(input: GetInstanceInviteCodeGroupDto): Promise<void>;
    groupFetchAllParticipating(input: GroupFetchAllParticipatingDto): Promise<void>;
    groupParticipantsUpdate(input: GroupParticipantsUpdateDto): Promise<void>;
    groupSettingUpdate(input: GroupSettingUpdateDto): Promise<void>;
    groupUpdateSubject(input: GroupUpdateSubjectDto): Promise<void>;
    groupUpdateDescription(input: GroupUpdateDescriptionDto): Promise<void>;
    groupGetInviteInfo(input: GroupGetInviteInfoDto): Promise<void>;
    groupAcceptInvite(input: GroupAcceptInviteDto): Promise<void>;
}

interface MiscService {
    verifyId(input: VerifyIdDto): Promise<void>;
    downloadProfile(input: DownloadProfileDto): Promise<void>;
    getUserStatus(input: GetUserStatusDto): Promise<void>;
    blockUnblock(input: BlockUnblockDto): Promise<void>;
    updateProfilePicture(input: UpdateProfilePictureDto): Promise<void>;
    getUserOrGroupById(input: GetUserOrGroupByIdDto): Promise<void>;
}

// TODO: implement 'MiscService' and GroupService
export interface WhatsappService extends  MessageService, InstanceService {}