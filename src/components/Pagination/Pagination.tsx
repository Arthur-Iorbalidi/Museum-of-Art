import styles from './Pagination.module.scss';
import { maxPageNumber } from '@constants/defaultSearchValues';
import images from '@constants/images';
import { IPagination } from '@services/ArtworksAPI';

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
        {pagination.current_page > 1 && (
          <button
            className={styles.previos_btn}
            onClick={() => handleChangePage(-1)}
          >
            <img src={images.arrowBack} alt="previos" />
          </button>
        )}
        {pagination.current_page - 2 >= 1 && (
          <button
            onClick={() => handleChangePage(-2)}
            className={styles.pagination_item}
          >
            {pagination.current_page - 2}
          </button>
        )}
        {pagination.current_page - 1 >= 1 && (
          <button
            onClick={() => handleChangePage(-1)}
            className={styles.pagination_item}
          >
            {pagination.current_page - 1}
          </button>
        )}
        <button className={`${styles.pagination_item} ${styles.active}`}>
          {pagination.current_page}
        </button>
        {pagination.current_page + 1 <= lastPageNumber && (
          <button
            onClick={() => handleChangePage(1)}
            className={styles.pagination_item}
          >
            {pagination.current_page + 1}
          </button>
        )}
        {pagination.current_page + 2 <= lastPageNumber && (
          <button
            onClick={() => handleChangePage(2)}
            className={styles.pagination_item}
          >
            {pagination.current_page + 2}
          </button>
        )}
        {pagination.current_page < lastPageNumber && (
          <button
            className={styles.next_btn}
            onClick={() => handleChangePage(1)}
          >
            <img src={images.arrowForward} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
