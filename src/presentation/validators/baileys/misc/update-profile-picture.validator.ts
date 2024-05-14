import * as yup from 'yup';

export const updateProfilePictureValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  url: yup.string().required(),
});
