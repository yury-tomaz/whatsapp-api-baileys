import * as yup from 'yup';

export const getQrCodeValidator = yup.object().shape({
  id: yup.string().required(),
  belongsTo: yup.string().optional(),
});
