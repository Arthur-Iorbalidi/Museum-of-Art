import { IArtwork } from '@services/ArtworksAPI';
import styles from './FavoriteArtwork.module.scss';
import FavoriteButton from '@components/ui/FavoriteButton/FavoriteButton';
import { Link } from 'react-router-dom';
import alternativeImg from '@assets/icons/alternative-img.svg';

interface IProps {
  favoriteArtwork: IArtwork;
  handleRemove: (id: number) => void;
}

const FavoriteArtwork = ({ favoriteArtwork, handleRemove }: IProps) => {
  const handleRemoveFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    handleRemove(favoriteArtwork.id);
  };

  return (
    <Link
      to={`/home/${favoriteArtwork.id}`}
      className={styles.favorite_artwork}
    >
      <div className={styles.img_wrapper}>
        <img
          src={`https://www.artic.edu/iiif/2/${favoriteArtwork.image_id}/full/843,/0/default.jpg`}
          alt="artwork"
          className={styles.artwork_img}
          onError={(e) => {
            e.currentTarget.src = alternativeImg;
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.tittle}>{favoriteArtwork.title}</p>
          <p className={styles.author}>{favoriteArtwork.artist_title}</p>
        </div>
        <div className={styles.favorite_btn_wrapper}>
          <FavoriteButton isInFavorites={true} onClick={handleRemoveFavorite} />
        </div>
      </div>
    </Link>
  );
};

export default FavoriteArtwork;
