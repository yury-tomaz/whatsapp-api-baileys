import {BaileysInstance} from "../../../bailyes.instance";
import Id from "../../../../../../../domain/value-object/id.value-object";
import EventDispatcherInterface from "../../../../../../../domain/events/event-dispatcher.interface";
import {AuthStateRepositoryInterface} from "../../../helpers/auth-state-db";
import {ProcessSocketEvent} from "../../../process-socket-event";
import {BaileysManager} from "../../../baileys-manager";

export class InitInstanceUseCase {
    constructor(
        private eventDispatcher: EventDispatcherInterface,
        private authStateRepository: AuthStateRepositoryInterface,
        private processSocketEvent: ProcessSocketEvent,
        private baileysManager: BaileysManager
    ) {
    }

    async execute(id: string) {
        const baileys = new BaileysInstance({
            id: new Id(id),
            authStateRepository: this.authStateRepository,
            eventDispatcher: this.eventDispatcher,
            processSocketEvent: this.processSocketEvent
        })

        baileys.init().then(r => this.baileysManager.create(baileys))
    }
}