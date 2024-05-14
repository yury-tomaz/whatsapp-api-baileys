export const getWhatsAppId = (id: string) => {
  if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) return id;
  return id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`;
};
