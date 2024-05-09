import {BaileysControllerFacade} from "../../../presentation/controllers/baileys-controllers";
import {
    InitBaileysController
} from "../../../presentation/controllers/baileys-controllers/instance/init-baileys.controller";
import {BaileysFactory} from "../../../modules/baileys/factory/baileysFactory";
import {
    GetQrCodeController
} from "../../../presentation/controllers/baileys-controllers/instance/get-qr-code.controller";
import { AcceptInviteGroupController } from "../../../presentation/controllers/baileys-controllers/group/accep-invite-group.controller";
import {
    DeleteInstanceController
} from "../../../presentation/controllers/baileys-controllers/instance/delete-instance.controller";
import {
  LogoutInstanceController
} from "../../../presentation/controllers/baileys-controllers/instance/logout-instance.controller";
import { CreateGroupController } from "../../../presentation/controllers/baileys-controllers/group/create-group.controller";
import { LeaveGroupController } from "../../../presentation/controllers/baileys-controllers/group/leave-group.controller";
import {
  GetInfoInstanceController
} from "../../../presentation/controllers/baileys-controllers/instance/get-info-instance.controller";
import {
  SendTextMessageController
} from "../../../presentation/controllers/baileys-controllers/message/send-text-message.controller";
import { MakeUserGroupController } from "../../../presentation/controllers/baileys-controllers/group/make-user-group.controller";
import {
  SendUrlMediaFileController
} from "../../../presentation/controllers/baileys-controllers/message/send-url-media-file.controller";
import { UpdateDescriptionGroupController } from "../../../presentation/controllers/baileys-controllers/group/update-description-group.controller";
import { UpdateSubjectGroupController } from "../../../presentation/controllers/baileys-controllers/group/update-subject-group.controller";

export class BaileysComposer{
    private static baileysFactory = BaileysFactory.create()
    static create(){
        const init = new InitBaileysController(this.baileysFactory);
        const acceptInviteGroup = new AcceptInviteGroupController(this.baileysFactory);
        const createGroup = new CreateGroupController(this.baileysFactory);
        const leaveGroup = new LeaveGroupController(this.baileysFactory);
        const makeUserGroup = new MakeUserGroupController(this.baileysFactory);
        const updateDescriptionGroup = new UpdateDescriptionGroupController(this.baileysFactory);
        const updateSubjectGroup = new UpdateSubjectGroupController(this.baileysFactory);
        const qr = new GetQrCodeController(this.baileysFactory);
        const del = new DeleteInstanceController(this.baileysFactory)
        const logout = new LogoutInstanceController(this.baileysFactory)
        const info = new GetInfoInstanceController(this.baileysFactory)
        const sendTextMessage = new SendTextMessageController(this.baileysFactory);
        const sendUrlMediaFile =new SendUrlMediaFileController(this.baileysFactory);

        return new BaileysControllerFacade({
            init,
            qr,
            createGroup,
            leaveGroup,
            acceptInviteGroup,
            makeUserGroup,
            updateDescriptionGroup,
            updateSubjectGroup,
            delete: del,
            logout,
            info,
            sendTextMessage,
            sendUrlMediaFile
        })
    }
}