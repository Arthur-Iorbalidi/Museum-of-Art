import FavoriteButton from '@components/ui/FavoriteButton/FavoriteButton';
import images from '@constants/images';
import routes from '@constants/routes';
import { IArtwork } from '@localTypes/ArtworksAPITypes';
import { Link } from 'react-router-dom';

import styles from './FavoriteArtwork.module.scss';

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
      to={`${routes.home}/${favoriteArtwork.id}`}
      className={styles.favorite_artwork}
    >
      <div className={styles.img_wrapper}>
        <img
          src={`https://www.artic.edu/iiif/2/${favoriteArtwork.image_id}/full/843,/0/default.jpg`}
          alt="artwork"
          className={styles.artwork_img}
          onError={(e) => {
            e.currentTarget.src = images.alternativeArtworkImg;
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
