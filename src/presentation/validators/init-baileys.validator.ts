import * as yup from 'yup';

export const initBaileysValidator = yup.object().shape({
  name: yup.string().required(),
  belongsTo: yup.string().required(),
});
