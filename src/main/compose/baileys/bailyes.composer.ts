import {BaileysControllerFacade} from "../../../presentation/controllers/baileys-controllers";
import {
    InitBaileysController
} from "../../../presentation/controllers/baileys-controllers/instance/init-baileys.controller";
import {BaileysFactory} from "../../../modules/baileys/factory/baileysFactory";
import { AcceptInviteGroupController } from "../../../presentation/controllers/baileys-controllers/group/accep-invite-group.controller";

export class BaileysComposer{
    private static baileysFactory = BaileysFactory.create()
    static create(){
        const init = new InitBaileysController(this.baileysFactory);
        const acceptInviteGroup = new AcceptInviteGroupController(this.baileysFactory);

        return new BaileysControllerFacade({
            init,
            acceptInviteGroup
        });
    }
}