import * as yup from 'yup';

export const isOnWhatsappValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
});
