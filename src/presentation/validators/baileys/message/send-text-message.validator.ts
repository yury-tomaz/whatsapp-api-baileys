import * as yup from 'yup';

export const sendTextMessageValidator = yup.object().shape({
  id: yup.string().required(),
  message: yup.string().required(),
  to: yup.string().required(),
});
