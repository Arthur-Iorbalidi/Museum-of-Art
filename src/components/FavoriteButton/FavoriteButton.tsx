import styles from './FavoriteButton.module.scss';
import favoriteBookmark from '@assets/icons/favorite-bookmark.svg';

interface IProps {
  isInFavorites: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FavoriteButton = ({ isInFavorites, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.favourite_btn} ${isInFavorites ? styles.in_favorites : ''}`}
    >
      <img src={favoriteBookmark} alt="add to favorites" />
    </button>
  );
};

export default FavoriteButton;
