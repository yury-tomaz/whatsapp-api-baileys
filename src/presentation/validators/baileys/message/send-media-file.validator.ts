import * as yup from 'yup';

export const sendMediaFileValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  type: yup.string().required(),
  caption: yup.string().required(),
  file: yup
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
});
