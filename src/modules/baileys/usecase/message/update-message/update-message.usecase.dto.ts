export default interface UpdateTextMessageUseCaseDto {
  id: string;
  to: string;
  message: string;
  key: {
    messageId: string;
    fromMe: boolean;
  }
}
