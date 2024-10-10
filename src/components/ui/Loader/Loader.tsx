import styles from './Loader.module.scss';
import loadingIcon from '@assets/icons/loading.svg';

const Loader = () => {
  return (
    <div className={styles.loadingWrapper}>
      <img className={styles.loadingIcon} src={loadingIcon} alt="loading" />
    </div>
  );
};

export default Loader;
