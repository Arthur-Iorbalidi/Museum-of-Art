import styles from './Pagination.module.scss';
import arrowBack from '@assets/icons/arrow-back.svg';
import arrowForward from '@assets/icons/arrow-forward.svg';
import { maxPageNumber } from '@constants/defaultSearchValues';
import { IGetParams, IPagination } from '@services/ArtworksAPI';

interface IProps {
  pagination: IPagination;
  handleChangePage: React.Dispatch<React.SetStateAction<IGetParams>>;
}

const Pagination = ({ pagination, handleChangePage }: IProps) => {
  const lastPageNumber =
    pagination.total_pages < maxPageNumber
      ? pagination.total_pages
      : maxPageNumber;

  const changePage = (count: number) => {
    handleChangePage((prevParams) => ({
      ...prevParams,
      page: prevParams.page + count,
    }));
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {pagination.current_page > 1 && (
          <button onClick={() => changePage(-1)}>
            <img src={arrowBack} alt="previos" />
          </button>
        )}
        {pagination.current_page - 2 >= 1 && (
          <button
            onClick={() => changePage(-2)}
            className={styles.paginationItem}
          >
            {pagination.current_page - 2}
          </button>
        )}
        {pagination.current_page - 1 >= 1 && (
          <button
            onClick={() => changePage(-1)}
            className={styles.paginationItem}
          >
            {pagination.current_page - 1}
          </button>
        )}
        <button className={`${styles.paginationItem} ${styles.active}`}>
          {pagination.current_page}
        </button>
        {pagination.current_page + 1 <= lastPageNumber && (
          <button
            onClick={() => changePage(1)}
            className={styles.paginationItem}
          >
            {pagination.current_page + 1}
          </button>
        )}
        {pagination.current_page + 2 <= lastPageNumber && (
          <button
            onClick={() => changePage(2)}
            className={styles.paginationItem}
          >
            {pagination.current_page + 2}
          </button>
        )}
        {pagination.current_page < lastPageNumber && (
          <button onClick={() => changePage(1)}>
            <img src={arrowForward} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
