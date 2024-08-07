import { BaileysFacade } from '../facade/baileysFacade';
import { InitInstanceUseCase } from '../usecase/instance/init/init-instance.usecase';
import { BaileysInstanceRepositoryInMemory } from '../repository/baileys-instance-repository-in-memory';
import { GetQrCodeUsecase } from '../usecase/instance/get-qr-code/get-qr-code.usecase';
import { DeleteInstanceUseCase } from '../usecase/instance/delete/delete-instance.useCase';
import { SendTextMessageUseCase } from '../usecase/message/send-text-message/send-text-message.useCase';
import { SendUrlMediaFileUseCase } from '../usecase/message/send-url-media-file/send-url-media-file.useCase';
import { AcceptInviteGroupUseCase } from '../usecase/group/accept-invite-group/accept-invite-group.useCase';
import { SendMediaFileUseCase } from '../usecase/message/send-media-file/send-media-file.usecase';
import { GetUserStatusUseCase } from '../usecase/misc/get-status-user/get-status-user.useCase';
import { GetProfilePictureUseCase } from '../usecase/misc/get-profile-picture/get-profile-picture.useCase';
import { UpdateProfilePictureUseCase } from '../usecase/misc/update-profile-picture/update-profile-picture.useCase';
import { BlockUnblockUserUseCase } from '../usecase/misc/block-unblock-user/block-unblock-user.useCase';
import { CreateGroupUseCase } from '../usecase/group/create-group/create-group.useCase';
import { LeaveGroupUseCase } from '../usecase/group/leave-group/leave-group.useCase';
import { InviteCodeGroupUseCase } from '../usecase/group/invite-code-group/invite-code-group.useCase';
import { UpdateSubjectGroupUseCase } from '../usecase/group/update-subject-group/update-subject-group.useCase';
import { UpdateDescriptionGroupUseCase } from '../usecase/group/update-description-group/update-description-group.useCase';
import { LogoutInstanceUseCase } from '../usecase/instance/logout/logout-instance-usecase';
import { GetInfoUseCase } from '../usecase/instance/get-info/get-info.usecase';
import { IsOnWhatsappUseCase } from '../usecase/misc/is-on-whatsapp/is-on-whatsapp.useCase';
import { MakeUserGroupUseCase } from '../usecase/group/make-user-group/make-user-group.useCase';
import { UpdateSettingsGroupUseCase } from '../usecase/group/update-settings-group/update-settings-group.useCase';
import { GetInviteInfoGroupUseCase } from '../usecase/group/get-invite-info-group/get-invite-info-group.useCase';
import { InstancesRepository } from '../repository/instances.repository';
import { RestoreAllInstanceUsecase } from '../usecase/instance/restore-all/restore-all-instance.usecase';
import { MessageRepository } from '../repository/message-repository';
import { FindAllMessageUseCase } from '../usecase/message/find-all-message/find-all-messages.usecase';
import { FindAllContactsUseCase } from '../usecase/message/find-all-contacts/find-all-contacts.usecase';
import { ContactRepository } from '../repository/contact-repository';
import { ChatRepository } from '../repository/chat-repository';
import { FindAllChatsUseCase } from '../usecase/message/find-all-chats/find-all-chats.usecase';
import { UpdateTextMessageUseCase } from '../usecase/message/update-message/update-message.useCase';
import { DeleteTextMessageUseCase } from '../usecase/message/delete-message/delete-message.useCase';
import { logger } from '../../@shared/infra/logger';
import { ListInstancesUsecase } from '../usecase/instance/list/list-instances.usecase';

export class BaileysFactory {
  static create() {
    const baileysManager = BaileysInstanceRepositoryInMemory.getInstance();
    const instanceRepository = new InstancesRepository();
    const messageRepository = new MessageRepository();
    const contactRepository = new ContactRepository();
    const chatRepository = new ChatRepository();

    const initUseCase = new InitInstanceUseCase(baileysManager);
    const restoreAllInstanceUsecase = new RestoreAllInstanceUsecase(
      instanceRepository,
      baileysManager,
    );

    const infoUseCase = new GetInfoUseCase(baileysManager);
    const qrUseCase = new GetQrCodeUsecase(baileysManager);
    const logoutUseCase = new LogoutInstanceUseCase(baileysManager);
    const deleteUseCase = new DeleteInstanceUseCase(
      instanceRepository,
      baileysManager,
    );
    const sendTextMessageUseCase = new SendTextMessageUseCase(baileysManager);
    const sendUrlMediaFileUseCase = new SendUrlMediaFileUseCase(baileysManager);
    const sendMediaFileUseCase = new SendMediaFileUseCase(baileysManager);

    const createGroupUseCase = new CreateGroupUseCase(baileysManager);
    const leaveGroupUseCase = new LeaveGroupUseCase(baileysManager);
    const getInviteCodeGroupUseCase = new InviteCodeGroupUseCase(
      baileysManager,
    );
    const groupUpdateSubjectUseCase = new UpdateSubjectGroupUseCase(
      baileysManager,
    );
    const groupUpdateDescriptionUseCase = new UpdateDescriptionGroupUseCase(
      baileysManager,
    );
    const groupAcceptInviteUseCase = new AcceptInviteGroupUseCase(
      baileysManager,
    );
    const makeUserGroupUseCase = new MakeUserGroupUseCase(baileysManager);
    const groupSettingUpdate = new UpdateSettingsGroupUseCase(baileysManager);
    const groupGetInviteInfo = new GetInviteInfoGroupUseCase(baileysManager);

    const getUserStatusUseCase = new GetUserStatusUseCase(baileysManager);
    const downloadProfileUseCase = new GetProfilePictureUseCase(baileysManager);
    const updateProfilePictureUseCase = new UpdateProfilePictureUseCase(
      baileysManager,
    );
    const verifyIdUseCase = new IsOnWhatsappUseCase(baileysManager);
    const blockUnblockUseCase = new BlockUnblockUserUseCase(baileysManager);
    const findAllMessages = new FindAllMessageUseCase(messageRepository);
    const findAllContacts = new FindAllContactsUseCase(contactRepository);
    const listInstances = new ListInstancesUsecase(baileysManager);

    restoreAllInstanceUsecase.execute().then(() => {
      logger.info('Sessions Restored Successfully');
    });
    const findAllChats = new FindAllChatsUseCase(chatRepository);
    const updateMessage = new UpdateTextMessageUseCase(baileysManager);
    const deleteMessage = new DeleteTextMessageUseCase(baileysManager);

    return new BaileysFacade({
      initUseCase,
      infoUseCase,
      qrUseCase,
      logoutUseCase,
      deleteUseCase,
      sendTextMessageUseCase,
      sendUrlMediaFileUseCase,
      sendMediaFileUseCase,
      getUserStatusUseCase,
      downloadProfileUseCase,
      updateProfilePictureUseCase,
      verifyIdUseCase,
      blockUnblockUseCase,
      createGroupUseCase,
      leaveGroupUseCase,
      getInviteCodeGroupUseCase,
      groupAcceptInviteUseCase,
      groupUpdateDescriptionUseCase,
      groupUpdateSubjectUseCase,
      makeUserGroupUseCase,
      groupSettingUpdate,
      groupGetInviteInfo,
      restoreAllInstanceUsecase,
      findAllMessages,
      findAllContacts,
      findAllChats,
      deleteMessage,
      updateMessage,
      listInstances,
    });
  }
}
