import styles from './Artwork.module.scss';
import { IArtwork } from '@services/ArtworksAPI';
import notFavoriteBookmark from '@assets/icons/notFavoriteBookmark.svg';

interface IProps {
  artwork: IArtwork;
}

const Painting = ({ artwork }: IProps) => {
  return (
    <div className={styles.artwork}>
      <img
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt="artwork"
        className={styles.artworkImg}
      />
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.tittle}>{artwork.title}</p>
          <p className={styles.author}>{artwork.artist_title}</p>
        </div>
        <button className={styles.favouriteBtn}>
          <img src={notFavoriteBookmark} alt="add to favorites" />
        </button>
      </div>
    </div>
  );
};

export default Painting;
