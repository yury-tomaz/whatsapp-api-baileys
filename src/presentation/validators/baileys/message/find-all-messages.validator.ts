import * as yup from 'yup';

export const findAllMessagesValidator = yup.object().shape({
  id: yup.string().required(),
  page: yup.number().required(),
  limit: yup.number().required(),
  to: yup.string().required(),
});
