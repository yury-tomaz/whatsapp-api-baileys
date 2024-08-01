import * as dto from './dtos';
interface InstanceService {
  init(input: dto.InitInstanceInputDto): Promise<any>;
  info(input: dto.GetInfoUseCaseDTO): Promise<void>;
  qr(
    input: dto.GetQrCodeUseCaseDTO['input'],
  ): Promise<dto.GetQrCodeUseCaseDTO['output']>;
  logout(input: dto.LogoutInstanceUseCaseDto): Promise<void>;
  delete(input: dto.DeleteInstanceUseCaseDto): Promise<void>;
  restore(): Promise<void>;
  list(): Promise<dto.ListInstancesUsecaseOutpuDto[]>;
}

interface MessageService {
  sendTextMessage(input: dto.SendTextMessageUseCaseDto): Promise<void>;
  sendUrlMediaFile(input: dto.SendUrlMediaFileUseCaseDto): Promise<void>;
  sendMediaFile(input: dto.SendMediaFileUseCaseDto): Promise<void>;
  findAllMessages(input: dto.FindAllMessageUseCaseDto): Promise<any>;
  findAllContacts(input: dto.FindAllContactsUseCaseDto): Promise<any>;
  findAllChats(input: dto.FindAllChatsUseCaseDto): Promise<any>;
  updateMessage(input: dto.UpdateTextMessageUseCaseDto): Promise<any>;
  deleteMessage(input: dto.DeleteTextMessageUseCaseDto): Promise<any>;
}

interface GroupService {
  createNewGroup(input: dto.CreateGroupDto): Promise<any>;
  //getAllGroups(): Promise<void>;
  leaveGroup(input: dto.LeaveGroupDto): Promise<any>;
  getInviteCodeGroup(input: dto.InviteCodeGroupDto): Promise<any>;
  makeUserGroup(input: dto.MakeUserGroupDto): Promise<any>;
  //getInstanceInviteCodeGroup(): Promise<void>;
  //groupFetchAllParticipating(): Promise<void>;
  groupSettingUpdate(input: dto.UpdateSettingsGroupDto): Promise<void>;
  groupUpdateSubject(input: dto.UpdateSubjectGroupDto): Promise<any>;
  groupUpdateDescription(input: dto.UpdateDescriptionGroupDto): Promise<any>;
  groupGetInviteInfo(input: dto.GetInviteInGroupDto): Promise<void>;
  groupAcceptInvite(input: dto.AcceptInviteGroupDto): Promise<any>;
}

interface MiscService {
  verifyId(input: dto.IsOnWhatsappDto): Promise<any>;
  downloadProfile(input: dto.GetProfilePictureDto): Promise<any>;
  getUserStatus(input: dto.GetUserStatusDto): Promise<any>;
  blockUnblock(input: dto.BlockUnblockUserDto): Promise<any>;
  updateProfilePicture(input: dto.UpdateProfilePictureDto): Promise<any>;
  // getUserOrGroupById(): Promise<void>;
}

// TODO: implement 'MiscService' and GroupService
export interface WhatsappService
  extends MessageService,
  InstanceService,
  GroupService,
  MiscService { }
