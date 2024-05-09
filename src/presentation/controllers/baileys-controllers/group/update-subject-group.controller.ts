import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {ControllerInterface} from "../../../interfaces/controller.interface";
import { updateSubjectGroupValidator } from "../../../validators/baileys/group/update-subject-group.validator";

export class UpdateSubjectGroupController implements  ControllerInterface{
    constructor(
        private usecase: WhatsappService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const { groupId, subject } = request.body;

        updateSubjectGroupValidator.validateSync({id, groupId, subject});

        const execute = await this.usecase.groupUpdateSubject({
          id,
          groupId,
          subject
        });

        return new HttpResponse(
            {
                message: "Baileys update subject group successfully",
                data: execute
            },
            {"Content-Type": "application/json"},
            200
        )
    }
}