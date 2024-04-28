export interface SendMediaUrlMessageInputDTO {
    id: string;
    to: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    mimetype: string;
    caption?: string;
}
