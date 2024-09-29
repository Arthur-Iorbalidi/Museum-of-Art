import { IArtwork } from '@services/ArtworksAPI';
import styles from './Artworks.module.scss';
import Painting from './components/Artwork/Artwork';

interface IProps {
  artworks: IArtwork[] | undefined;
}

const Paintings = ({ artworks }: IProps) => {
  return (
    <div className={styles.artworks}>
      {artworks?.map((artwork) => (
        <Painting artwork={artwork} key={artwork.id}></Painting>
      ))}
    </div>
  );
};

export default Paintings;
