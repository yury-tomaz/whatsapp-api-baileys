import { DownloadableMessage, MediaType, downloadContentFromMessage } from "@whiskeysockets/baileys";

export const downloadMessage = async (msg: DownloadableMessage, msgType: MediaType): Promise<string> => {
  let buffer = Buffer.from([]);

  try {
    const stream = await downloadContentFromMessage( {
      directPath: msg.directPath,
      url: msg.url,
      mediaKey: msg.mediaKey,
    }, msgType);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }
  } catch {
    console.log('error downloading file-message');
  }
  return buffer.toString('base64')
}

