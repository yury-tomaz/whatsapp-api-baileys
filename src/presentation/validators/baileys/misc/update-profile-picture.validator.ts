import * as yup from "yup";

export const updateProfilePictureValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  url: yup
  .mixed()
  .test('file', 'Arquivo inválido', async function (value) {
    if (!value) {
      return false;
    }

    if (!Buffer.isBuffer(value)) {
      return false;
    }
    const maxSize = 10 * 1024 * 1024; // 10MB
    return value.length <= maxSize;
  })
  .required(),
})