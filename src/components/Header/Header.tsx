import styles from './Header.module.scss';
import museumLogo from '@assets/icons/museum-logo-dark.svg';
import { Link } from 'react-router-dom';
import bookmark from '@assets/icons/bookmark.svg';
import home from '@assets/icons/home.svg';
import useWindowWidth from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';

const Header = () => {
  const currentWindowWidth = useWindowWidth();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const handleOpenBurgerMenu = () => {
    setIsBurgerMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    if (currentWindowWidth >= 550) {
      setIsBurgerMenuOpened(false);
    }
  }, [currentWindowWidth]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img src={museumLogo} alt="logo" className={styles.museum_logo} />
        </div>
        {currentWindowWidth >= 550 && (
          <nav>
            <ul className={styles.list}>
              <li>
                <Link to="/home" className={styles.link}>
                  <img src={home} alt="" />
                  <span className={styles.link_text}>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/favorites" className={styles.link}>
                  <img src={bookmark} alt="" />
                  <span className={styles.link_text}>Your Favorites</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {currentWindowWidth < 550 && (
          <button
            className={`${styles.burger_btn} ${isBurgerMenuOpened ? styles.active : ''}`}
            onClick={handleOpenBurgerMenu}
          >
            <div className={styles.burger_line}></div>
            <div className={styles.burger_line}></div>
          </button>
        )}
        {isBurgerMenuOpened && (
          <nav className={styles.burger_menu}>
            <ul className={styles.burger_menu_list}>
              <li>
                <Link
                  to="/home"
                  className={styles.link}
                  onClick={() => setIsBurgerMenuOpened(false)}
                >
                  <img src={home} alt="" />
                  <span className={styles.link_text}>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className={styles.link}
                  onClick={() => setIsBurgerMenuOpened(false)}
                >
                  <img src={bookmark} alt="" />
                  <span className={styles.link_text}>Your Favorites</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
