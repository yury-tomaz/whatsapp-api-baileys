import * as yup from 'yup';

export const updateSettingsGroupValidator = yup.object().shape({
  id: yup.string().required(),
  groupId: yup.string().required(),
  action: yup
    .mixed()
    .oneOf(['announcement', 'not_announcement', 'unlocked', 'locked'])
    .required(),
});
