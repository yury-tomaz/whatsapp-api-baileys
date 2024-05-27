import { ControllerInterface } from '../../interfaces/controller.interface';

export class BaileysControllerFacade {
  constructor(
    private props: {
      init: ControllerInterface;
      acceptInviteGroup: ControllerInterface;
      info: ControllerInterface;
      createGroup: ControllerInterface;
      leaveGroup: ControllerInterface;
      makeUserGroup: ControllerInterface;
      updateDescriptionGroup: ControllerInterface;
      updateSubjectGroup: ControllerInterface;
      updateSettingsGroup: ControllerInterface;
      inviteInfoGroup: ControllerInterface;
      inviteCodeGroup: ControllerInterface;
      qr: ControllerInterface;
      logout: ControllerInterface;
      delete: ControllerInterface;
      sendTextMessage: ControllerInterface;
      sendUrlMediaFile: ControllerInterface;
      sendMediaFile: ControllerInterface;
      blockUnblockUser: ControllerInterface;
      profilePicture: ControllerInterface;
      getUserStatus: ControllerInterface;
      isOnWhatsap: ControllerInterface;
      updateProfilePicture: ControllerInterface;
      findAllMessages: ControllerInterface;
      findAllContacts: ControllerInterface;
      restore: ControllerInterface;
      listInstances: ControllerInterface;
    },
  ) {}

  get init() {
    return this.props.init;
  }
  get acceptInviteGroup() {
    return this.props.acceptInviteGroup;
  }
  get info() {
    return this.props.info;
  }
  get createGroup() {
    return this.props.createGroup;
  }
  get leaveGroup() {
    return this.props.leaveGroup;
  }
  get makeUserGroup() {
    return this.props.makeUserGroup;
  }
  get updateDescriptionGroup() {
    return this.props.updateDescriptionGroup;
  }
  get updateSubjectGroup() {
    return this.props.updateSubjectGroup;
  }
  get updateSettingsGroup() {
    return this.props.updateSettingsGroup;
  }
  get inviteInfoGroup() {
    return this.props.inviteInfoGroup;
  }
  get inviteCodeGroup() {
    return this.props.inviteCodeGroup;
  }
  get qr() {
    return this.props.qr;
  }
  get logout() {
    return this.props.logout;
  }
  get delete() {
    return this.props.delete;
  }
  get sendTextMessage() {
    return this.props.sendTextMessage;
  }
  get sendUrlMediaFile() {
    return this.props.sendUrlMediaFile;
  }
  get sendMediaFile() {
    return this.props.sendMediaFile;
  }
  get blockUnblockUser() {
    return this.props.blockUnblockUser;
  }
  get profilePicture() {
    return this.props.profilePicture;
  }
  get getUserStatus() {
    return this.props.getUserStatus;
  }
  get isOnWhatsap() {
    return this.props.isOnWhatsap;
  }
  get updateProfilePicture() {
    return this.props.updateProfilePicture;
  }
  get findAllMessages() {
    return this.props.findAllMessages;
  }
  get findAllContacts() {
    return this.props.findAllContacts;
  }

  get restore() {
    return this.props.restore;
  }

  get listInstances() {
    return this.props.listInstances;
  }
}
