import PaginationItem from '@components/PaginationItem/PaginationItem';
import images from '@constants/images';
import {
  arrowsGaps,
  firstPageNumber,
  maxPageNumber,
  paginationGaps,
} from '@constants/paginationSettings';
import { IPagination } from '@services/ArtworksAPI';
import { memo } from 'react';

import styles from './Pagination.module.scss';

interface IProps {
  pagination: IPagination;
  handleChangePage: (count: number) => void;
}

const Pagination = ({ pagination, handleChangePage }: IProps) => {
  const lastPageNumber =
    pagination.total_pages < maxPageNumber
      ? pagination.total_pages
      : maxPageNumber;

  const handlePrevClick = () => {
    handleChangePage(arrowsGaps.back);
  };

  const handleNextClick = () => {
    handleChangePage(arrowsGaps.forward);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {pagination.current_page > firstPageNumber && (
          <button className={styles.previos_btn} onClick={handlePrevClick}>
            <img src={images.arrowBack} alt="previos" />
          </button>
        )}
        {paginationGaps.map((gap) => {
          const page = pagination.current_page + gap;
          if (page >= firstPageNumber && page <= lastPageNumber) {
            return (
              <PaginationItem
                key={gap}
                page={page}
                gap={gap}
                handleChangePageCallback={handleChangePage}
              />
            );
          }
          return null;
        })}
        {pagination.current_page < lastPageNumber && (
          <button className={styles.next_btn} onClick={handleNextClick}>
            <img src={images.arrowForward} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Pagination);
