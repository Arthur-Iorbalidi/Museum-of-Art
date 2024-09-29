import styles from './SearchForm.module.scss';
import searchIcon from '../../../../assets/icons/search.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getValidationSchema from './validationSchema';

interface IFormFields {
  query: string;
}

interface IProps {
  handleChangeQuery: (query: string) => void;
}

const SearchForm = ({ handleChangeQuery }: IProps) => {
  const validationSchema = getValidationSchema();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormFields> = (data: IFormFields) => {
    handleChangeQuery(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
      <div className={styles.formField}>
        <input
          type="text"
          {...register('query')}
          placeholder="Search..."
          className={styles.queryField}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </div>
      <p className={styles.errorMessage}>{errors.query?.message}</p>
    </form>
  );
};

export default SearchForm;
