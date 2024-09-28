import { useParams } from 'react-router-dom';
import styles from './DetailedPage.module.scss';

const DetailedPage = () => {
  const { id } = useParams();
  return <div className={styles.wrapper}>{id}</div>;
};

export default DetailedPage;
