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

export class BaileysComposer{
    private static baileysFactory = BaileysFactory.create()
    static create(){
        const init = new InitBaileysController(this.baileysFactory);
        const acceptInviteGroup = new AcceptInviteGroupController(this.baileysFactory);
        const qr = new GetQrCodeController(this.baileysFactory);
        const del = new DeleteInstanceController(this.baileysFactory)

        return new BaileysControllerFacade({
            init,
            qr,
            acceptInviteGroup,
            delete: del
        })
    }
}