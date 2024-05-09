import { ControllerInterface } from "../../interfaces/controller.interface";

export class BaileysControllerFacade {
    constructor(private props: {
        init: ControllerInterface;
        acceptInviteGroup: ControllerInterface;
        createGroup: ControllerInterface;
        // info: ControllerInterface;
        qr: ControllerInterface;
        logout: ControllerInterface;
        delete: ControllerInterface;
        // sendTextMessage: ControllerInterface;
        // sendUrlMediaFile: ControllerInterface;
        // sendMediaFile: ControllerInterface;
    }) {}

    get init() { return this.props.init; }
    get acceptInviteGroup() { return this.props.acceptInviteGroup; }
    get createGroup() { return this.props.createGroup; }
    // get info() { return this.props.info; }
    get qr() { return this.props.qr; }
    get logout() { return this.props.logout}
    get delete() { return this.props.delete; }
    // get sendTextMessage() { return this.props.sendTextMessage; }
    // get sendUrlMediaFile() { return this.props.sendUrlMediaFile; }
    // get sendMediaFile() { return this.props.sendMediaFile; }
}
