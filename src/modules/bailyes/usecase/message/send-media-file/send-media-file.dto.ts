type mediaType = "image" | "video" | "audio" | "document"
export interface SendMediaFileDto{
    id: string,
    to: string,
    type: mediaType,
    file: Express.Multer.File,
    caption?: string
}