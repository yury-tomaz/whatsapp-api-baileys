export interface GetQrCodeUseCaseInputDTO {
    key: string;
}

export interface GetQrCodeUseCaseOutputDTO {
    qrCode: string;
}

export interface GetQrCodeUseCaseInterface {
    execute(input: GetQrCodeUseCaseInputDTO): Promise<GetQrCodeUseCaseOutputDTO>;
}