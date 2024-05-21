export default interface SendMediaFileUseCaseDto {
  id: string;
  to: string;
  type: 'image' | 'video' | 'audio' | 'document';
  file: Express.Multer.File;
  caption?: string;
}
