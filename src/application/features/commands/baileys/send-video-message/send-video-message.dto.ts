export interface SendVideoMessageUseCaseInputDTO {
    key: string;
    to: string;
    file: Express.Multer.File;
    caption?: string;
}