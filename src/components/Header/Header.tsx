import styles from './Header.module.scss';
import museumLogo from '@assets/icons/museum-logo-dark.svg';
import { Link } from 'react-router-dom';
import bookmark from '@assets/icons/bookmark.svg';
import home from '@assets/icons/home.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img src={museumLogo} alt="" />
        <nav>
          <ul className={styles.list}>
            <li>
              <Link to="/home" className={styles.link}>
                <img src={home} alt="" />
                <span className={styles.linkText}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={styles.link}>
                <img src={bookmark} alt="" />
                <span className={styles.linkText}>Your Favorites</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
