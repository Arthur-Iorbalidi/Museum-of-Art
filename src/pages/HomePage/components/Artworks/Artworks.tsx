import { IArtwork } from '@services/ArtworksAPI';
import styles from './Artworks.module.scss';
import Painting from './components/Artwork/Artwork';
import loadingIcon from '@assets/icons/loading.svg';

interface IProps {
  artworks: IArtwork[] | undefined;
  isLoading: boolean;
}

const Paintings = ({ artworks, isLoading }: IProps) => {
  return (
    <div className={styles.artworks}>
      {isLoading && (
        <div className={styles.loadingWrapper}>
          <img className={styles.loadingIcon} src={loadingIcon} alt="loading" />
        </div>
      )}
      {artworks?.map((artwork) => (
        <Painting artwork={artwork} key={artwork.id}></Painting>
      ))}
    </div>
  );
};

export default Paintings;
