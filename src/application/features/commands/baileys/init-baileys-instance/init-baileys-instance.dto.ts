export interface InitBaileysInstanceUseCaseInputDTO {
    key: string;
    webhook?: string;
    allowWebhook?: boolean;
    heardEvents: string[];
    isWebhookBase64?: boolean;
    markMessagesRead?: boolean;
    apiKey?: string;
}

export interface InitBailesInstanceUseCaseOutputDTO {
    key: string;
    webhook: string | undefined;
    allowWebhook: boolean;
    heardEvents: string[];
    isOn: boolean;

}
