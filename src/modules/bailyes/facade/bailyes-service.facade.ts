import {WhatsappService} from "./bailyes.facade.interface";
import UseCaseInterface from "../../@shared/application/use-case/use-case.interface";
import {InitInstanceDto} from "../usecase/instance/init/init-instance.dto";
import {GetInfoUseCaseDTO} from "../usecase/instance/get-info/get-instance-info.dto";
import {GetQrCodeUseCaseDTO} from "../usecase/instance/get-qr-code/get-qr-code.usecase.dto";
import {DeleteInstanceUseCaseDto} from "../usecase/instance/delete/delete-instance.usecase.dto";
import {SendTextMessageUseCaseDto} from "../usecase/message/send-text-message/send-text-message.dto";
import {SendUrlMediaFileUseCaseDto} from "../usecase/message/send-url-media-file/send-url-media-file.usecase.dto";
import { CreateGroupDto } from "../usecase/group/create-group/create-group.dto";
import { LeaveGroupDto } from "../usecase/group/leave-group/leave-group.dto";
import { InviteCodeGroupDto } from "../usecase/group/invite-code-group/invite-code-group.dto";
import { AcceptInviteGroupDto } from "../usecase/group/accept-invite-group/accept-invite-group.dto";
import { UpdateDescriptionGroupDto } from "../usecase/group/update-description-group/update-description-group.dto";
import { UpdateSubjectGroupDto } from "../usecase/group/update-subject-group/update-subject-group.dto";
import { BlockUnblockUserDto } from "../usecase/misc/block-unblock-user/block-unblock-user.dto";
import { IsOnWhatsappDto } from "../usecase/misc/is-on-whatsapp/is-on-whatsapp.dto";
import { GetUserStatusDto } from "../usecase/misc/get-status-user/get-status-user.dto";
import { GetProfilePictureDto } from "../usecase/misc/get-profile-picture/get-profile-picture.dto";
import { UpdateProfilePictureDto } from "../usecase/misc/update-profile-picture/update-profile-picture.dto";
import { MakeUserGroupDto } from "../usecase/group/make-user-group/make-user-group.dto";
import { UpdateSettingsGroupDto } from "../usecase/group/update-settings-group/update-settings-group.dto";


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
    //getAllGroups: UseCaseInterface;
    leaveGroupUseCase: UseCaseInterface;
    getInviteCodeGroupUseCase: UseCaseInterface;
    //groupFetchAllParticipating: UseCaseInterface;
    //groupParticipantsUpdate: UseCaseInterface;
    groupSettingUpdate: UseCaseInterface;
    groupUpdateSubjectUseCase: UseCaseInterface;
    groupUpdateDescriptionUseCase: UseCaseInterface;
    //groupGetInviteInfo: UseCaseInterface;
    groupAcceptInviteUseCase: UseCaseInterface;
    verifyIdUseCase: UseCaseInterface;
    blockUnblockUseCase: UseCaseInterface;
    getUserStatusUseCase: UseCaseInterface;
    downloadProfileUseCase: UseCaseInterface;
    updateProfilePictureUseCase: UseCaseInterface;
}

export class BailyesServiceFacade implements WhatsappService {
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
    _groupSettingUpdate:  UseCaseInterface;

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
        this._getInviteCodeGroup = props.getInviteCodeGroupUseCase
        this._groupUpdateSubject = props.groupUpdateSubjectUseCase
        this._groupUpdateDescription = props.groupUpdateDescriptionUseCase
        this._groupAcceptInvite = props.groupAcceptInviteUseCase
        this._blockUnblock = props.blockUnblockUseCase
        this._verifyId = props.verifyIdUseCase
        this._getUserStatus = props.getUserStatusUseCase
        this._downloadProfile = props.downloadProfileUseCase
        this._updateProfilePicture = props.updateProfilePictureUseCase;
        this._makeUserGroupUseCase = props.makeUserGroupUseCase;
        this._groupSettingUpdate = props.groupSettingUpdate;
    }

    init(input: InitInstanceDto){
        return this._initUseCase.execute(input)
    }
    info(input: GetInfoUseCaseDTO){
        return this._infoUseCase.execute(input)
    }
    qr(input: GetQrCodeUseCaseDTO){
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
    createNewGroup(input: CreateGroupDto) {
        return this._createNewGroup.execute(input)
    }

    leaveGroup(input: LeaveGroupDto) {
        return this._leaveGroup.execute(input);
    }

    getInviteCodeGroup(input: InviteCodeGroupDto) {
        return this._getInviteCodeGroup.execute(input);
    }

    groupAcceptInvite(input: AcceptInviteGroupDto) {
        return this._groupAcceptInvite.execute(input);
    }

    groupUpdateDescription(input: UpdateDescriptionGroupDto) {
        return this._groupUpdateDescription.execute(input);
    }

    groupUpdateSubject(input: UpdateSubjectGroupDto) {
        return this._groupUpdateSubject.execute(input);
    }

    makeUserGroup(input: MakeUserGroupDto) {
        return this._makeUserGroupUseCase.execute(input);
    }

    groupSettingUpdate(input: UpdateSettingsGroupDto): Promise<void> {
        return this._groupSettingUpdate.execute(input);
    }

    blockUnblock(input: BlockUnblockUserDto) {
        return this._blockUnblock.execute(input);
    }

    verifyId(input: IsOnWhatsappDto) {
        return this._verifyId.execute(input);
    }

    getUserStatus(input: GetUserStatusDto) {
        return this._getUserStatus.execute(input);
    }

    downloadProfile(input: GetProfilePictureDto) {
        return this._downloadProfile.execute(input);
    }

    updateProfilePicture(input: UpdateProfilePictureDto) {
        return this._updateProfilePicture.execute(input);
    }
}