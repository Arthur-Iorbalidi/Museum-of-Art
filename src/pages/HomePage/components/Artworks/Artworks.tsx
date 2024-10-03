import { IArtwork } from '@services/ArtworksAPI';
import styles from './Artworks.module.scss';
import Artwork from './components/Artwork/Artwork';
import Loader from '@components/Loader/Loader';

interface IProps {
  artworks: IArtwork[] | undefined;
  isLoading: boolean;
}

const Artworks = ({ artworks, isLoading }: IProps) => {
  return (
    <div className={styles.artworks}>
      {isLoading && <Loader />}
      {artworks?.map((artwork) => (
        <Artwork artwork={artwork} key={artwork.id}></Artwork>
      ))}
    </div>
  );
};

export default Artworks;
