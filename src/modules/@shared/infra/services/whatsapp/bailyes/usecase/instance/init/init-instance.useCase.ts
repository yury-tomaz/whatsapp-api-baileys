import {BaileysInstance} from "../../../bailyes.instance";
import Id from "../../../../../../../domain/value-object/id.value-object";
import EventDispatcherInterface from "../../../../../../../domain/events/event-dispatcher.interface";
import {ProcessSocketEvent} from "../../../process-socket-event";
import {BaileysManager} from "../../../baileys-manager";
import {AuthStateRepositoryInterface} from "../../../repository/auth-state-repository.interface";
import {InitInstanceDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class InitInstanceUseCase {
    constructor(
        private eventDispatcher: EventDispatcherInterface,
        private authStateRepository: AuthStateRepositoryInterface,
        private processSocketEvent: ProcessSocketEvent,
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: InitInstanceDto) {
        const baileys = new BaileysInstance({
            id: new Id(input.id),
            authStateRepository: this.authStateRepository,
            eventDispatcher: this.eventDispatcher,
            processSocketEvent: this.processSocketEvent
        })

        baileys.init().then(r => this.baileysManager.create(baileys))
    }
}