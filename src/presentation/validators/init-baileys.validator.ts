import * as yup from "yup";

export const initBaileysValidator = yup.object().shape({
    key: yup.string().required(),
    webhook: yup.string().url(),
    allowWebhook: yup.boolean(),
    heardEvents: yup.array().of(yup.string()),
    isWebhookBase64: yup.boolean(),
    markMessagesRead: yup.boolean(),
    apiKey: yup.string()
});