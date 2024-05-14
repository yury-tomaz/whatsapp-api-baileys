import * as yup from 'yup';

export const sendMediaFileValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  type: yup.string().required(),
  caption: yup.string().required(),
  file: yup.mixed().test('file', 'The file is too large', (value: any) => {
    if (!value) return false;
    if (!value.length) return true;
    const maxSize = 10 * 1024 * 1024;
    return value[0].size <= maxSize;
  }),
});
