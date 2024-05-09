import * as yup from "yup";

export const updateSubjectGroupValidator = yup.object().shape({
  id: yup.string().required(),
  groupId: yup.string().required(),
  subject: yup.string().required(),
});