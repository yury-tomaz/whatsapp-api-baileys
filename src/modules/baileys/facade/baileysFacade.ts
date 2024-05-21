import { WhatsappService } from './baileys.facade.interface';
import UseCaseInterface from '../../@shared/application/use-case/use-case.interface';
import * as dto from './dtos';
import { RestoreAllInstanceUsecase } from '../usecase/instance/restore-all/restore-all-instance.usecase';
export interface UseCasesProps {
  initUseCase: UseCaseInterface;
  infoUseCase: UseCaseInterface;
  qrUseCase: UseCaseInterface;
  logoutUseCase: UseCaseInterface;
  deleteUseCase: UseCaseInterface;
  sendTextMessageUseCase: UseCaseInterface;
  sendUrlMediaFileUseCase: UseCaseInterface;
  sendMediaFileUseCase: UseCaseInterface;
  createGroupUseCase: UseCaseInterface;
  makeUserGroupUseCase: UseCaseInterface;
  leaveGroupUseCase: UseCaseInterface;
  getInviteCodeGroupUseCase: UseCaseInterface;
  groupSettingUpdate: UseCaseInterface;
  groupUpdateSubjectUseCase: UseCaseInterface;
  groupUpdateDescriptionUseCase: UseCaseInterface;
  groupGetInviteInfo: UseCaseInterface;
  groupAcceptInviteUseCase: UseCaseInterface;
  verifyIdUseCase: UseCaseInterface;
  blockUnblockUseCase: UseCaseInterface;
  getUserStatusUseCase: UseCaseInterface;
  downloadProfileUseCase: UseCaseInterface;
  updateProfilePictureUseCase: UseCaseInterface;
  restoreAllInstanceUsecase: UseCaseInterface;
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
  _createNewGroup: UseCaseInterface;
  _leaveGroup: UseCaseInterface;
  _getInviteCodeGroup: UseCaseInterface;
  _groupUpdateSubject: UseCaseInterface;
  _groupUpdateDescription: UseCaseInterface;
  _groupAcceptInvite: UseCaseInterface;
  _verifyId: UseCaseInterface;
  _blockUnblock: UseCaseInterface;
  _getUserStatus: UseCaseInterface;
  _downloadProfile: UseCaseInterface;
  _updateProfilePicture: UseCaseInterface;
  _makeUserGroupUseCase: UseCaseInterface;
  _groupSettingUpdate: UseCaseInterface;
  _groupGetInviteInfo: UseCaseInterface;
  _restoreAllInstanceUsecase: UseCaseInterface;

  constructor(props: UseCasesProps) {
    this._initUseCase = props.initUseCase;
    this._infoUseCase = props.infoUseCase;
    this._qrUseCase = props.qrUseCase;
    this._logoutUseCase = props.logoutUseCase;
    this._deleteUseCase = props.deleteUseCase;
    this._sendTextMessageUseCase = props.sendTextMessageUseCase;
    this._sendUrlMediaFileUseCase = props.sendUrlMediaFileUseCase;
    this._sendMediaFileUseCase = props.sendMediaFileUseCase;
    this._createNewGroup = props.createGroupUseCase;
    this._leaveGroup = props.leaveGroupUseCase;
    this._getInviteCodeGroup = props.getInviteCodeGroupUseCase;
    this._groupUpdateSubject = props.groupUpdateSubjectUseCase;
    this._groupUpdateDescription = props.groupUpdateDescriptionUseCase;
    this._groupAcceptInvite = props.groupAcceptInviteUseCase;
    this._blockUnblock = props.blockUnblockUseCase;
    this._verifyId = props.verifyIdUseCase;
    this._getUserStatus = props.getUserStatusUseCase;
    this._downloadProfile = props.downloadProfileUseCase;
    this._updateProfilePicture = props.updateProfilePictureUseCase;
    this._makeUserGroupUseCase = props.makeUserGroupUseCase;
    this._groupSettingUpdate = props.groupSettingUpdate;
    this._groupGetInviteInfo = props.groupGetInviteInfo;
    this._restoreAllInstanceUsecase = props.restoreAllInstanceUsecase
  }

  init(input: dto.InitInstanceInputDto) {
    return this._initUseCase.execute(input);
  }

  restore(): Promise<void> {
    return this._restoreAllInstanceUsecase.execute(undefined);
  }

  info(input: dto.GetInfoUseCaseDTO) {
    return this._infoUseCase.execute(input);
  }
  qr(input: dto.GetQrCodeUseCaseInputDTO) {
    return this._qrUseCase.execute(input);
  }
  logout(input: dto.LogoutInstanceUseCaseDto) {
    return this._logoutUseCase.execute(input);
  }
  delete(input: dto.DeleteInstanceUseCaseDto) {
    return this._deleteUseCase.execute(input);
  }
  sendTextMessage(input: dto.SendTextMessageUseCaseDto) {
    return this._sendTextMessageUseCase.execute(input);
  }
  sendUrlMediaFile(input: dto.SendUrlMediaFileUseCaseDto) {
    return this._sendUrlMediaFileUseCase.execute(input);
  }
  sendMediaFile(input: dto.SendMediaFileUseCaseDto) {
    return this._sendMediaFileUseCase.execute(input);
  }
  createNewGroup(input: dto.CreateGroupDto) {
    return this._createNewGroup.execute(input);
  }

  leaveGroup(input: dto.LeaveGroupDto) {
    return this._leaveGroup.execute(input);
  }

  getInviteCodeGroup(input: dto.InviteCodeGroupDto) {
    return this._getInviteCodeGroup.execute(input);
  }

  groupAcceptInvite(input: dto.AcceptInviteGroupDto) {
    return this._groupAcceptInvite.execute(input);
  }

  groupUpdateDescription(input: dto.UpdateDescriptionGroupDto) {
    return this._groupUpdateDescription.execute(input);
  }

  groupUpdateSubject(input: dto.UpdateSubjectGroupDto) {
    return this._groupUpdateSubject.execute(input);
  }

  makeUserGroup(input: dto.MakeUserGroupDto) {
    return this._makeUserGroupUseCase.execute(input);
  }

  groupSettingUpdate(input: dto.UpdateSettingsGroupDto) {
    return this._groupSettingUpdate.execute(input);
  }

  groupGetInviteInfo(input: dto.GetInviteInGroupDto) {
    return this._groupGetInviteInfo.execute(input);
  }

  blockUnblock(input: dto.BlockUnblockUserDto) {
    return this._blockUnblock.execute(input);
  }

  verifyId(input: dto.IsOnWhatsappDto) {
    return this._verifyId.execute(input);
  }

  getUserStatus(input: dto.GetUserStatusDto) {
    return this._getUserStatus.execute(input);
  }

  downloadProfile(input: dto.GetProfilePictureDto) {
    return this._downloadProfile.execute(input);
  }

  updateProfilePicture(input: dto.UpdateProfilePictureDto) {
    return this._updateProfilePicture.execute(input);
  }
}
