import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import useWindowWidth from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import BurgerMenu from '@components/ui/BurgerMenu/BurgerMenu';
import BurgerMenuButton from '@components/ui/BurgerMenuButton/BurgerMenuButton';
import routes from '@constants/routes';
import images from '@constants/images';

const Header = () => {
  const currentWindowWidth = useWindowWidth();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  useEffect(() => {
    if (currentWindowWidth >= 550) {
      setIsBurgerMenuOpened(false);
    }
  }, [currentWindowWidth]);

  const handleOpenBurgerMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    toggleBurgerMenu();
  };

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpened((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img
            src={images.museumLogoLight}
            alt="logo"
            className={styles.museum_logo}
          />
        </div>
        {currentWindowWidth >= 550 && (
          <nav>
            <ul className={styles.list}>
              <li>
                <Link to={routes.home} className={styles.link}>
                  <img src={images.home} alt="home icon" />
                  <span className={styles.link_text}>Home</span>
                </Link>
              </li>
              <li>
                <Link to={routes.favorites} className={styles.link}>
                  <img src={images.bookmark} alt="favorites icon" />
                  <span className={styles.link_text}>Your Favorites</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {currentWindowWidth < 550 && (
          <BurgerMenuButton
            isBurgerMenuOpened={isBurgerMenuOpened}
            handleOpenBurgerMenu={handleOpenBurgerMenu}
          />
        )}
        <BurgerMenu
          toggleBurgerMenu={toggleBurgerMenu}
          isBurgerMenuOpened={isBurgerMenuOpened}
        />
      </div>
    </header>
  );
};

export default Header;
