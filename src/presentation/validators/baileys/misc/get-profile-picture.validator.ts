import * as yup from "yup";

export const getProfilePictureValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  action: yup.string().required(),
})