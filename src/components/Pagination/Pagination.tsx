import styles from './Pagination.module.scss';
import {
  arrowsGaps,
  firstPageNumber,
  maxPageNumber,
  paginationGaps,
} from '@constants/paginationSettings';
import images from '@constants/images';
import { IPagination } from '@services/ArtworksAPI';
import PaginationItem from '@components/PaginationItem/PaginationItem';

interface IProps {
  pagination: IPagination;
  handleChangePage: (count: number) => void;
}

const Pagination = ({ pagination, handleChangePage }: IProps) => {
  const lastPageNumber =
    pagination.total_pages < maxPageNumber
      ? pagination.total_pages
      : maxPageNumber;

  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {pagination.current_page > firstPageNumber && (
          <button
            className={styles.previos_btn}
            onClick={() => handleChangePage(arrowsGaps.back)}
          >
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
          <button
            className={styles.next_btn}
            onClick={() => handleChangePage(arrowsGaps.forward)}
          >
            <img src={images.arrowForward} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
