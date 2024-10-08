import { IArtwork } from '@services/ArtworksAPI';
import styles from './FavoritesArtworks.module.scss';
import Loader from '@components/Loader/Loader';
import FavoriteArtwork from './components/FavoriteArtwork/FavoriteArtwork';

interface IProps {
  favoriteArtworks: IArtwork[] | undefined;
  isLoading: boolean;
  handleRemove: (id: number) => void;
}

const FavoritesArtworks = ({
  favoriteArtworks,
  isLoading,
  handleRemove,
}: IProps) => {
  return (
    <div className={styles.favorites_artworks}>
      {isLoading && <Loader />}
      {favoriteArtworks?.map((favoriteArtwork) => (
        <FavoriteArtwork
          favoriteArtwork={favoriteArtwork}
          key={favoriteArtwork.id}
          handleRemove={handleRemove}
        ></FavoriteArtwork>
      ))}
      {favoriteArtworks?.length === 0 && (
        <div className={styles.message}>It&apos;s empty here</div>
      )}
    </div>
  );
};

export default FavoritesArtworks;
