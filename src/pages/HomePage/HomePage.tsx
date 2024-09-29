import SearchForm from './components/SearchForm/SearchForm';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.tittle}>
        Let&apos;s Find Some <span>Art</span> Here!
      </h1>
      <SearchForm />
    </div>
  );
};

export default HomePage;
