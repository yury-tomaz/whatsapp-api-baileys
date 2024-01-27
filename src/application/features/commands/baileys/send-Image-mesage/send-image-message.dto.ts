export interface SendImageMessageUseCaseInputDTO {
    key: string;
    to: string;
    file: Express.Multer.File;
    caption?: string;
}