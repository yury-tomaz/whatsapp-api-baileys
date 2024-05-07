import * as yup from "yup";

export const accepInviteGroupValidator = yup.object().shape({
  id: yup.string().required(),
  codeGroup: yup.string().required()
});