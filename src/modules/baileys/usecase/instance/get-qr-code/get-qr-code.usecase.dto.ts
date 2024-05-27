interface GetQrCodeUseCaseInputDTO {
  id: string;
}

interface GetQrCodeUseCaseOutPutDTO {
  qr: string | undefined;
}

export default interface GetQrCodeUseCaseDTO {
  input: GetQrCodeUseCaseInputDTO;
  output: GetQrCodeUseCaseOutPutDTO;
}
