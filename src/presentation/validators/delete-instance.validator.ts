import * as yup from "yup";

export const deleteInstanceValidator = yup.object().shape({
    id: yup.string().required(),
})