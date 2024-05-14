import * as yup from 'yup';

export const sendUrlMediaFileValidator = yup.object().shape({
  id: yup.string().required(),
  url: yup.string().required(),
  caption: yup.string().required(),
  mimetype: yup.string().optional(),
  to: yup.string().required(),
  type: yup.string().optional(),
});
