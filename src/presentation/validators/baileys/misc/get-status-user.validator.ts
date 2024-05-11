import * as yup from "yup";

export const getStatusUserValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
})