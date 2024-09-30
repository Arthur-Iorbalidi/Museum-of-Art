import artworksAPI, { IGetParams, IResponse } from '@services/ArtworksAPI';
import SearchForm from './components/SearchForm/SearchForm';
import styles from './HomePage.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { defaultSearchValues } from '@constants/defaultSearchValues';
import Artworks from './components/Artworks/Artworks';
import Pagination from './components/Pagination/Pagination';

const HomePage = () => {
  const [artworks, setArtworks] = useState<IResponse | null>(null);
  const [params, setParams] = useState<IGetParams>(defaultSearchValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await artworksAPI.get(params);
      setArtworks(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleChangePage = (count: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + count,
    }));
  };

  const handleChangeQuery = useCallback((query: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
      searchQuery: query,
    }));
  }, []);

  return (
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.tittle}>
          Let&apos;s Find Some <span>Art</span> Here!
        </h1>
        <SearchForm handleChangeQuery={handleChangeQuery} />
        <h2 className={styles.subtittle}>Artworks</h2>
        <Artworks isLoading={isLoading} artworks={artworks?.data} />
        {artworks && (
          <Pagination
            handleChangePage={handleChangePage}
            pagination={artworks.pagination}
          />
        )}
      </div>
    </main>
  );
};

export default HomePage;
