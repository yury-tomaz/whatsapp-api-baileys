export default interface DeleteTextMessageUseCaseDto {
  id: string;
  to: string;
  key: {
    messageId: string;
    fromMe: boolean;
  };
}
