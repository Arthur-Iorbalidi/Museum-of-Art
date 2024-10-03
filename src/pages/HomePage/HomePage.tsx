import artworksAPI, { IArtworksResponse } from '@services/ArtworksAPI';
import SearchForm from './components/SearchForm/SearchForm';
import styles from './HomePage.module.scss';
import { useCallback, useEffect, useState } from 'react';
import Artworks from './components/Artworks/Artworks';
import Pagination from './components/Pagination/Pagination';
import Sorting from './components/Sorting/Sorting';
import { useSearchParamsContext } from '@context/searchParamsContext';

const HomePage = () => {
  const [artworks, setArtworks] = useState<IArtworksResponse | null>(null);
  const { params, setParams } = useSearchParamsContext();
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

  const handleChangeSorting = useCallback((sortOption: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
      sort: sortOption,
    }));
  }, []);

  return (
    <section className={styles.home_page}>
      <div className={styles.wrapper}>
        <h1 className={styles.tittle}>
          Let&apos;s Find Some <span>Art</span> Here!
        </h1>
        <SearchForm
          currentSearchValue={params.searchQuery}
          handleChangeQuery={handleChangeQuery}
        />
        {params.searchQuery !== '' && (
          <Sorting handleChangeSorting={handleChangeSorting} />
        )}
        <h2 className={styles.subtittle}>Artworks</h2>
        <Artworks isLoading={isLoading} artworks={artworks?.data} />
        {artworks && (
          <Pagination
            handleChangePage={handleChangePage}
            pagination={artworks.pagination}
          />
        )}
      </div>
    </section>
  );
};

export default HomePage;
