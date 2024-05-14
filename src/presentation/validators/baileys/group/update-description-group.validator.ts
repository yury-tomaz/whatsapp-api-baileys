import * as yup from 'yup';

export const updateDescriptionGroupValidator = yup.object().shape({
  id: yup.string().required(),
  groupId: yup.string().required(),
  description: yup.string().required(),
});
