import * as yup from "yup";

export const leaveGroupValidator = yup.object().shape({
  id: yup.string().required(),
  users: yup.array().of(yup.string()).required()
});