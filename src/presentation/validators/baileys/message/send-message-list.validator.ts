import * as yup from 'yup';

export const sendMessageListValidator = yup.object().shape({
  id: yup.string().required(),
  to: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().optional(),
  buttonText: yup.string().required(),
  text: yup.string().required(),
  sections: yup
    .array(
      yup.object().shape({
        title: yup.string().required(),
        rows: yup
          .array(
            yup.object().shape({
              title: yup.string().required(),
              description: yup.string().required(),
              rowId: yup.string().optional(),
            }),
          )
          .required(),
      }),
    )
    .min(1)
    .required(),
});
