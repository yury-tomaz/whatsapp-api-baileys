import * as yup from 'yup';

export const initBaileysValidator = yup.object().shape({
  name: yup.string().required(),
  sessionId: yup.string().required(),
  belongsTo: yup.string().optional(),
});
