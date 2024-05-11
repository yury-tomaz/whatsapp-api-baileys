import * as yup from "yup";

export const leaveGroupValidator = yup.object().shape({
  id: yup.string().required(),
  groupId: yup.string().required(),
});