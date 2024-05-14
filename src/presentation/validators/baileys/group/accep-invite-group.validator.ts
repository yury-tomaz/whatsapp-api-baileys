import * as yup from 'yup';

export const accepInviteGroupValidator = yup.object().shape({
  id: yup.string().required(),
  code: yup.string().required(),
});
