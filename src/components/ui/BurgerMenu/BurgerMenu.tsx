import { Link } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import bookmark from '@assets/icons/bookmark.svg';
import home from '@assets/icons/home.svg';
import { useRef, useEffect } from 'react';
import routes from '@constants/routes';

interface IProps {
  toggleBurgerMenu: () => void;
  isBurgerMenuOpened: boolean;
}

const BurgerMenu = ({ toggleBurgerMenu, isBurgerMenuOpened }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleBurgerMenu();
    }
  };

  useEffect(() => {
    if (isBurgerMenuOpened) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isBurgerMenuOpened]);

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
                <img src={home} alt="home icon" />
                <span className={styles.link_text}>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.favorites}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <img src={bookmark} alt="favorites icon" />
                <span className={styles.link_text}>Your Favorites</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default BurgerMenu;
