import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {ControllerInterface} from "../../../interfaces/controller.interface";
import { updateDescriptionGroupValidator } from "../../../validators/baileys/group/update-description-group.validator";

export class UpdateDescriptionGroupController implements  ControllerInterface{
    constructor(
        private usecase: WhatsappService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const { groupId, description } = request.body;

        updateDescriptionGroupValidator.validateSync({id, groupId, description});

        const execute = await this.usecase.groupUpdateDescription({
          id,
          groupId,
          description
        });

        return new HttpResponse(
            {
                message: "Baileys update description group successfully",
                data: execute
            },
            {"Content-Type": "application/json"},
            200
        )
    }
}