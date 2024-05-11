import * as yup from "yup";

export const blockUnblockUserValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  action: yup.mixed()
  .oneOf(['block', 'unblock']).required()
})