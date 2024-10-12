import Artwork, { Appearance } from '@components/Artwork/Artwork';
import Artworks, { LayoutType } from '@components/Artworks/Artworks';
import images from '@constants/images';
import { emptyMessage } from '@constants/messages';
import { IFavoritesArtworksResponse } from '@localTypes/ArtworksAPITypes';
import favouritesAPI from '@services/FavouritesAPI';
import { useCallback, useEffect, useState } from 'react';

import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const [favoriteArtworks, setFavoriteArtworks] =
    useState<IFavoritesArtworksResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await favouritesAPI.getFavoritesArtworks();
      setFavoriteArtworks(data);
      setIsLoading(false);
    })();
  }, []);

  const handleRemove = useCallback((id: number) => {
    setFavoriteArtworks((prev) => {
      return {
        ...prev!,
        data: prev!.data.filter((item) => item.id !== id),
      };
    });

    favouritesAPI.removeFromFavourites(id);
  }, []);

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
        <Artworks
          isLoading={isLoading}
          layoutType={LayoutType.twoColumns}
          message={
            favoriteArtworks?.data.length === 0 ? emptyMessage : undefined
          }
        >
          {favoriteArtworks?.data.map((artwork) => (
            <Artwork
              artwork={artwork}
              appearance={Appearance.horizontal}
              handleRemove={handleRemove}
              key={artwork.id}
            ></Artwork>
          ))}
        </Artworks>
      </div>
    </section>
  );
};

export default FavoritesPage;
