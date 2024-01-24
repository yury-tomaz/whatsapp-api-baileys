import { Baileys } from '../../../../../domain/entities/baileys.entity';
import { BaileysInstanceRepositoryInterface } from '../../../../../domain/repositories/baileys-instance.repository.interface';

import {
    InitBailesInstanceUseCaseInterface,
    InitBailesInstanceUseCaseOutputDTO,
    InitBaileysInstanceUseCaseInputDTO
} from '../../../../../application/contracts/usecase.interface';
import EventDispatcher from '../../../../../domain/events/event-dispatcher';

type input = InitBaileysInstanceUseCaseInputDTO;
type output = InitBailesInstanceUseCaseOutputDTO;

export class InitBailesInstanceUseCase implements InitBailesInstanceUseCaseInterface {
    constructor(
        private readonly baileysInstanceRepository: BaileysInstanceRepositoryInterface,
        private readonly eventDispatcher: EventDispatcher,
    ) { }

    async execute(input: input): Promise<output> {
        const baileys = new Baileys({
            key: input.key,
            allowWebhook: input.allowWebhook,
            heardEvents: input.heardEvents,
            isWebhookBase64: input.isWebhookBase64,
            markMessagesRead: input.markMessagesRead,
            webhook: input.webhook,
            apiKey: input.apiKey,
            eventDispatcher: this.eventDispatcher,
        })

        await baileys.init();
        await this.baileysInstanceRepository.create(baileys);

        return {
            key: baileys.key,
            allowWebhook: baileys.allowWebhook,
            heardEvents: baileys.heardEvents,
            webhook: baileys.webhook,
            isOn: baileys.isOn,
        }
    }
}