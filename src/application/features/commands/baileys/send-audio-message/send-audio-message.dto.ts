export interface sendAudioMessageUseCaseInputDTO {
    key: string;
    to: string;
    file: Express.Multer.File;
    caption?: string;
}