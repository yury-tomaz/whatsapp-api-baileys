import * as yup from "yup";

export const createGroupValidator = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  users: yup.array().of(yup.string()).required()
});