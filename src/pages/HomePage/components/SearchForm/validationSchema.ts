import * as yup from 'yup';

const getValidationSchema = () => {
  return yup.object().shape({
    query: yup
      .string()
      .trim()
      .required("It can't be empty")
      .min(2, 'min length - 2')
      .max(50, 'max length - 50'),
  });
};

export default getValidationSchema;
