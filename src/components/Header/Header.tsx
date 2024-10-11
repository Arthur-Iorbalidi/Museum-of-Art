import BurgerMenu from '@components/ui/BurgerMenu/BurgerMenu';
import BurgerMenuButton from '@components/ui/BurgerMenuButton/BurgerMenuButton';
import breakpoints from '@constants/breakpoints';
import images from '@constants/images';
import routes from '@constants/routes';
import useWindowWidth from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const currentWindowWidth = useWindowWidth();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  useEffect(() => {
    if (currentWindowWidth >= breakpoints.burgerMenuAppearance) {
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
        {currentWindowWidth >= breakpoints.burgerMenuAppearance && (
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
        {currentWindowWidth < breakpoints.burgerMenuAppearance && (
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
