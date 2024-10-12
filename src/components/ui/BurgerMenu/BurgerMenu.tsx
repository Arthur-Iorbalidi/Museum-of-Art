import images from '@constants/images';
import routes from '@constants/routes';
import useClickOutside from '@hooks/useClickOutside';
import { memo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './BurgerMenu.module.scss';

interface IProps {
  toggleBurgerMenu: () => void;
  isBurgerMenuOpened: boolean;
}

const BurgerMenu = ({ toggleBurgerMenu, isBurgerMenuOpened }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    toggleBurgerMenu();
  }, [toggleBurgerMenu]);

  useClickOutside(menuRef, handleClickOutside);

  return (
    <>
      {isBurgerMenuOpened && (
        <nav className={styles.burger_menu} ref={menuRef}>
          <ul className={styles.burger_menu_list}>
            <li>
              <Link
                to={routes.home}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <img src={images.home} alt="home icon" />
                <span className={styles.link_text}>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.favorites}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <img src={images.bookmark} alt="favorites icon" />
                <span className={styles.link_text}>Your Favorites</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default memo(BurgerMenu);
