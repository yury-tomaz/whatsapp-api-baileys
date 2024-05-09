import * as yup from "yup";

export const sendUrlMediaFileValidator = yup.object().shape({
  id:  yup.string().required(),
  url: yup.string().required(),
  caption: yup.string().required(),
  mimetype: yup.string().required(),
  to: yup.string().required(),
  typ: yup.string().required()
})