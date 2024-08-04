import * as yup from 'yup';

export const updateTextMessageValidator = yup.object().shape({
  id: yup.string().required(),
  message: yup.string().required(),
  to: yup.string().required(),
  key: yup.object().shape({
    fromMe: yup.boolean(),
    messageId: yup.string(),
  }),
});
