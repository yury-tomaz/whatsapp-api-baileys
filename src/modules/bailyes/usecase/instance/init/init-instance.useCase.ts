import {Baileys} from "../../../domain/bailyes.entity";
import {ProcessSocketEvent} from "../../../domain/process-socket-event";
import {BaileysInstanceRepositoryInMemory} from "../../../repository/baileys-instance-repository-in-memory";
import {AuthStateRepositoryInterface} from "../../../gateway/auth-state-repository.interface";
import EventDispatcherInterface from "../../../../@shared/domain/events/event-dispatcher.interface";
import {InitInstanceDto} from "./init-instance.dto";
import Id from "../../../../@shared/domain/value-object/id.value-object";

export class InitInstanceUseCase {
    constructor(
        private eventDispatcher: EventDispatcherInterface,
        private authStateRepository: AuthStateRepositoryInterface,
        private processSocketEvent: ProcessSocketEvent,
        private baileysManager: BaileysInstanceRepositoryInMemory
    ) {
    }

    async execute(input: InitInstanceDto) {
        const baileys = new Baileys({
            id: new Id(input.id),
            authStateRepository: this.authStateRepository,
            eventDispatcher: this.eventDispatcher,
            processSocketEvent: this.processSocketEvent
        })

        baileys.init().then(r => this.baileysManager.create(baileys))
    }
}