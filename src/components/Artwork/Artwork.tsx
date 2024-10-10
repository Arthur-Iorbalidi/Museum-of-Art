import styles from './Artwork.module.scss';
import { IArtwork } from '@services/ArtworksAPI';
import { Link } from 'react-router-dom';
import favouritesAPI from '@services/FavouritesAPI';
import { useState } from 'react';
import FavoriteButton from '@components/ui/FavoriteButton/FavoriteButton';
import alternativeImg from '@assets/icons/alternative-img.svg';

interface IProps {
  artwork: IArtwork;
}

const Artwork = ({ artwork }: IProps) => {
  const [isInFavorites, setIsInFavorites] = useState(
    favouritesAPI.isInFavorites(artwork.id),
  );

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (isInFavorites) {
      favouritesAPI.removeFromFavourites(artwork.id);
      setIsInFavorites(false);
    } else {
      favouritesAPI.addToFavourites(artwork.id);
      setIsInFavorites(true);
    }
  };

  return (
    <Link to={`${artwork.id}`} className={styles.artwork}>
      <div>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt="artwork"
          className={styles.artwork_img}
          onError={(e) => {
            e.currentTarget.src = alternativeImg;
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.tittle}>{artwork.title}</p>
          <p className={styles.author}>{artwork.artist_title}</p>
        </div>
        <FavoriteButton
          isInFavorites={isInFavorites}
          onClick={handleToggleFavorite}
        />
      </div>
    </Link>
  );
};

export default Artwork;
