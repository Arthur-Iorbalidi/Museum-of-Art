import FavoritesArtworks from '@components/FavoritesArtworks/FavoritesArtworks';
import images from '@constants/images';
import artworksAPI, { IFavoritesArtworksResponse } from '@services/ArtworksAPI';
import favouritesAPI from '@services/FavouritesAPI';
import { useEffect, useState } from 'react';

import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const [favoriteArtworks, setFavoriteArtworks] =
    useState<IFavoritesArtworksResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await artworksAPI.getArtworksByIds(
        favouritesAPI.getFavorites(),
      );
      setFavoriteArtworks(data);
      setIsLoading(false);
    })();
  }, []);

  const handleRemove = (id: number) => {
    setFavoriteArtworks((prev) => {
      return {
        ...prev!,
        data: prev!.data.filter((item) => item.id !== id),
      };
    });

    favouritesAPI.removeFromFavourites(id);
  };

  return (
    <section className={styles.favorites_page}>
      <div className={styles.wrapper}>
        <h1 className={styles.tittle}>
          Here are your{' '}
          <span>
            <img
              className={styles.bookmark_icon}
              src={images.favoriteBookmark}
              alt=""
            />{' '}
            Favorites
          </span>
        </h1>
        <h2 className={styles.subtittle}>
          Saved by you <span>Your favorites list</span>
        </h2>
        <FavoritesArtworks
          isLoading={isLoading}
          favoriteArtworks={favoriteArtworks?.data}
          handleRemove={handleRemove}
        />
      </div>
    </section>
  );
};

export default FavoritesPage;
