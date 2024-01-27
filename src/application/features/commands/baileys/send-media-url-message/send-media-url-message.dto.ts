export interface SendMediaUrlMessageInputDTO {
    key: string;
    to: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    mimetype: string;
    caption?: string;
}
