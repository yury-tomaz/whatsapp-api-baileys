import {BaileysControllerFacade} from "../../../presentation/controllers/baileys-controllers";
import {
    InitBaileysController
} from "../../../presentation/controllers/baileys-controllers/instance/init-baileys.controller";
import {BaileysFactory} from "../../../modules/baileys/factory/baileysFactory";
import {
    GetQrCodeController
} from "../../../presentation/controllers/baileys-controllers/instance/get-qr-code.controller";

export class BaileysComposer{
    private static baileysFactory = BaileysFactory.create()
    static create(){
        const init = new InitBaileysController(this.baileysFactory);
        const qr = new GetQrCodeController(this.baileysFactory);

        return new BaileysControllerFacade({
            init,
            qr
        })
    }
}