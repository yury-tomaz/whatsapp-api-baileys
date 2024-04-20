import { Router } from "express";
import { routesVersioning } from "../middlewares/route-versioning.middleware";
import { sendTextMessageCompose } from "../composers/baileys/send-text-message.composer";
import { sendAudioMessageCompose } from "../composers/baileys/send-audio-message.compose";
import { sendImageMessageComposer } from "../composers/baileys/send-image-message.composer";
import { sendVideoMessageComposer } from "../composers/baileys/send-video-message.composer";
import { sendContactMessageComposer } from "../composers/baileys/send-contact-message.composer";
import { sendDocumentMessageComposer } from "../composers/baileys/send-document-message.composer";
import { sendMediaUrlMessageComposer } from "../composers/baileys/send-media-url-message.composer";
import multer from 'multer';

const messageRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

messageRouter.post("/:key/text", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendTextMessageCompose()
    })
);

messageRouter.post("/:key/audio", upload, (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendAudioMessageCompose()
    })
);

messageRouter.post("/:key/image", upload, (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendImageMessageComposer()
    })
);

messageRouter.post("/:key/video", upload, (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendVideoMessageComposer()
    })
);

messageRouter.post("/:key/contact", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendContactMessageComposer()
    })
);

messageRouter.post("/:key/document", upload, (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendDocumentMessageComposer()
    })
);

messageRouter.post("/:key/mediaurl", (request, response) =>
    routesVersioning(request, response, {
        '1.0.0': sendMediaUrlMessageComposer()
    })
);

export default messageRouter as Router;