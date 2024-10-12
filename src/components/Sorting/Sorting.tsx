import sortOptions from '@constants/sortOptions';
import { memo } from 'react';

import styles from './Sorting.module.scss';

interface IProps {
  handleChangeSorting: (sortOption: string) => void;
}

const Sorting = ({ handleChangeSorting }: IProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeSorting(event.target.value);
  };

  return (
    <div className={styles.select_wrapper}>
      <select className={styles.select} name="sorting" onChange={onChange}>
        {sortOptions.map((sortOption) => (
          <option value={sortOption.value} key={sortOption.id}>
            {sortOption.tittle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Sorting);
