import * as yup from 'yup';

export const inviteGroupValidator = yup.object().shape({
  id: yup.string().required(),
  groupId: yup.string().required(),
});
