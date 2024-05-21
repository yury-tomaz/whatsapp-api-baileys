import * as yup from 'yup';

export const findAllChatsValidator = yup.object().shape({
  id: yup.string().required(),
  page: yup.number().required(),
  limit: yup.number().required(),
});
