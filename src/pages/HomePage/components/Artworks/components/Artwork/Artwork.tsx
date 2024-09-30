import styles from './Artwork.module.scss';
import { IArtwork } from '@services/ArtworksAPI';
import favoriteBookmark from '@assets/icons/favorite-bookmark.svg';
import { Link } from 'react-router-dom';

interface IProps {
  artwork: IArtwork;
}

const Painting = ({ artwork }: IProps) => {
  return (
    <Link to={`${artwork.id}`} className={styles.artwork}>
      <img
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt="artwork"
        className={styles.artwork_img}
      />
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.tittle}>{artwork.title}</p>
          <p className={styles.author}>{artwork.artist_title}</p>
        </div>
        <button className={styles.favourite_btn}>
          <img src={favoriteBookmark} alt="add to favorites" />
        </button>
      </div>
    </Link>
  );
};

export default Painting;
