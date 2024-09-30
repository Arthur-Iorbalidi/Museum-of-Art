import { IArtwork } from '@services/ArtworksAPI';
import styles from './Artworks.module.scss';
import Painting from './components/Artwork/Artwork';
import Loader from '@components/Loader/Loader';

interface IProps {
  artworks: IArtwork[] | undefined;
  isLoading: boolean;
}

const Paintings = ({ artworks, isLoading }: IProps) => {
  return (
    <div className={styles.artworks}>
      {isLoading && <Loader />}
      {artworks?.map((artwork) => (
        <Painting artwork={artwork} key={artwork.id}></Painting>
      ))}
    </div>
  );
};

export default Paintings;
