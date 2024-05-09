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
import { CreateGroupGroupController } from "../../../presentation/controllers/baileys-controllers/group/create-group.controller";
import {
  GetInfoInstanceController
} from "../../../presentation/controllers/baileys-controllers/instance/get-info-instance.controller";

export class BaileysComposer{
    private static baileysFactory = BaileysFactory.create()
    static create(){
        const init = new InitBaileysController(this.baileysFactory);
        const acceptInviteGroup = new AcceptInviteGroupController(this.baileysFactory);
        const createGroup = new CreateGroupGroupController(this.baileysFactory);
        const qr = new GetQrCodeController(this.baileysFactory);
        const del = new DeleteInstanceController(this.baileysFactory)
        const logout = new LogoutInstanceController(this.baileysFactory)
        const info = new GetInfoInstanceController(this.baileysFactory)

        return new BaileysControllerFacade({
            init,
            qr,
            createGroup,
            acceptInviteGroup,
            delete: del,
            logout,
            info
        })
    }
}