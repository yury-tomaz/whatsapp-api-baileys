import * as yup from "yup";

export const makeUserGroupValidator = yup.object().shape({
  id: yup.string().required(),
  users: yup.array().of(yup.string()).required(),
  groupId: yup.string().required(),
  type: yup.mixed()
  .oneOf(['add', 'demote' , 'remove' ,'promote']).required()
});