import { useNavigate, useParams } from 'react-router-dom';
import styles from './DetailedPage.module.scss';
import { useEffect, useState } from 'react';
import artworksAPI, { IArtworkResponse } from '@services/ArtworksAPI';
import Loader from '@components/ui/Loader/Loader';
import favouritesAPI from '@services/FavouritesAPI';
import FavoriteButton from '@components/ui/FavoriteButton/FavoriteButton';
import images from '@constants/images';

const DetailedPage = () => {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<IArtworkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(
    favouritesAPI.isInFavorites(Number(id)),
  );

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await artworksAPI.getArtworkById(id!);
      setArtwork(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (isInFavorites) {
      favouritesAPI.removeFromFavourites(artwork!.data.id);
      setIsInFavorites(false);
    } else {
      favouritesAPI.addToFavourites(artwork!.data.id);
      setIsInFavorites(true);
    }
  };

  return (
    <section className={styles.detailed_page}>
      {isLoading && <Loader />}
      {artwork && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={() => navigate(-1)}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_wrapper}>
            <img
              className={styles.artwork_img}
              src={`https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/843,/0/default.jpg`}
              alt="artwork"
              onError={(e) => {
                e.currentTarget.src = images.alternativeArtworkImg;
              }}
            />
            <div className={styles.favourite_btn_wrapper}>
              <FavoriteButton
                isInFavorites={isInFavorites}
                onClick={handleToggleFavorite}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.main_info}>
              <p className={styles.tittle}>{artwork.data.title}</p>
              <p className={styles.author_short}>{artwork.data.artist_title}</p>
              <p className={styles.date}>{artwork.data.date_display}</p>
            </div>
            <div className={styles.overview}>
              <h2 className={styles.overview_tittle}>Overview</h2>
              <p className={styles.overview_item}>
                Artist:{' '}
                <span className={styles.overview_item_value}>
                  {artwork.data.artist_display}
                </span>
              </p>
              <p className={styles.overview_item}>
                Style:{' '}
                <span className={styles.overview_item_value}>
                  {artwork.data.style_title}
                </span>
              </p>
              <p className={styles.overview_item}>
                Dimensions Sheet:{' '}
                <span className={styles.overview_item_value}>
                  {artwork.data.dimensions}
                </span>
              </p>
              <p className={styles.overview_item}>
                Credit Line:{' '}
                <span className={styles.overview_item_value}>
                  {artwork.data.credit_line}
                </span>
              </p>
              <p></p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailedPage;
