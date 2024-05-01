// =================================
// instance
// =================================
export interface InitInstanceDto {
    id: string
}
export interface InfoInstanceDto{
    id: string
}
export interface qrInstanceDto{
    id: string
}
export interface logoutInstanceDto{
    id: string
}
export interface DeleteInstanceDto{
    id: string
}

// =================================
// Message
// =================================
export interface SendTextMessageDto {
    id: string;
    to: string;
    message: string;
}
export interface SendUrlMediaFileDto {
    id: string;
    to: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    mimetype: string;
    caption?: string;
}
export interface SendMediaFileDto {
    id: string,
    to: string,
    type: 'image' | 'video' | 'audio' | 'document',
    file: Express.Multer.File,
    caption?: string
}

// =================================
// Group
// =================================
export interface CreateNewGroupDto{}
export interface AddNewParticipantDto{}
export interface MakeAdminDto{}
export interface DemoteAdminDto{}
export interface GetAllGroupsDto{}
export interface LeaveGroupDto{}
export interface GetInviteCodeGroupDto{}
export interface GetInstanceInviteCodeGroupDto{}
export interface GroupFetchAllParticipatingDto{}
export interface GroupParticipantsUpdateDto{}
export interface GroupSettingUpdateDto{}
export interface GroupUpdateSubjectDto{}
export interface GroupUpdateDescriptionDto{}
export interface GroupGetInviteInfoDto{}
export interface GroupAcceptInviteDto{}

// =================================
// misc
// =================================

export interface VerifyIdDto{}
export interface DownloadProfileDto{}
export interface GetUserStatusDto{}
export interface BlockUnblockDto{}
export interface UpdateProfilePictureDto{}
export interface GetUserOrGroupByIdDto{}