import artworksAPI, { IGetParams, IResponse } from '@services/ArtworksAPI';
import SearchForm from './components/SearchForm/SearchForm';
import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { defaultSearchValues } from '@constants/defaultSearchValues';
import Artworks from './components/Artworks/Artworks';
import Pagination from './components/Pagination/Pagination';

const HomePage = () => {
  const [artworks, setArtworks] = useState<IResponse | null>(null);
  const [params, setParams] = useState<IGetParams>(defaultSearchValues);

  useEffect(() => {
    (async () => {
      const data = await artworksAPI.getArtworks(params);
      setArtworks(data);
    })();
  }, [params]);

  return (
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.tittle}>
          Let&apos;s Find Some <span>Art</span> Here!
        </h1>
        <SearchForm />
        <h2 className={styles.subtittle}>Artworks</h2>
        <Artworks artworks={artworks?.data} />
        {artworks && (
          <Pagination
            handleChangePage={setParams}
            pagination={artworks.pagination}
          />
        )}
      </div>
    </main>
  );
};

export default HomePage;
