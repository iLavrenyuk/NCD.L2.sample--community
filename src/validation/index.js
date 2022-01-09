import * as Yup from 'yup';

const text = Yup.string()
  .required('Title is required')
  .min(2, 'Must be at least 2 characters')
  .max(100, 'Title can be up to 100 characters long');

export const createFormSchema = Yup.object({
  title: text,
  description: text,
  location: text,
  category: Yup.number().positive().integer().required(),
});
