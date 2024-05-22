import * as yup from 'yup';

export const findAllContactsValidator = yup.object().shape({
  id: yup.string().required(),
  page: yup.number().required(),
  limit: yup.number().required(),
});
