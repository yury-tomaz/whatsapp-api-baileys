import * as yup from "yup";

export const inviteInfoGroupValidator = yup.object().shape({
  id: yup.string().required(),
  code: yup.string().required()
});