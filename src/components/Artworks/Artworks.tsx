import Artwork from '@components/Artwork/Artwork';
import Loader from '@components/ui/Loader/Loader';
import { IArtwork } from '@localTypes/ArtworksAPITypes';
import { memo } from 'react';

import styles from './Artworks.module.scss';

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

export default memo(Artworks);
