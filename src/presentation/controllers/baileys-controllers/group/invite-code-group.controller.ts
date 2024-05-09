import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {ControllerInterface} from "../../../interfaces/controller.interface"
import { inviteGroupValidator } from "../../../validators/baileys/group/invite-code-group.validator";

export class InviteCodeGroupController implements  ControllerInterface {
    constructor(
        private usecase: WhatsappService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const { groupId } = request.query;

        inviteGroupValidator.validateSync({id, groupId});

        const execute = await this.usecase.getInviteCodeGroup({
          id,
          groupId
        });

        return new HttpResponse(
            {
                message: "Baileys invite code group successfully",
                data: execute
            },
            {"Content-Type": "application/json"},
            200
        )
    }
}