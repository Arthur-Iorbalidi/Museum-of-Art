import Artwork, { Appearance } from '@components/Artwork/Artwork';
import Artworks, { LayoutType } from '@components/Artworks/Artworks';
import Pagination from '@components/Pagination/Pagination';
import SearchForm from '@components/SearchForm/SearchForm';
import Sorting from '@components/Sorting/Sorting';
import { emptyMessage } from '@constants/defaultSearchValues';
import { useSearchParamsContext } from '@context/searchParamsContext';
import { IArtworksResponse } from '@localTypes/ArtworksAPITypes';
import artworksAPI from '@services/ArtworksAPI';
import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './HomePage.module.scss';

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

  const handleChangePage = useCallback((count: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + count,
    }));
  }, []);

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

  const memoizedArtworks = useMemo(() => {
    return artworks?.data.map((artwork) => (
      <Artwork
        artwork={artwork}
        appearance={Appearance.vertical}
        key={artwork.id}
      />
    ));
  }, [artworks?.data]);

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
        <Artworks
          isLoading={isLoading}
          layoutType={LayoutType.threeColumns}
          message={artworks?.data.length === 0 ? emptyMessage : undefined}
        >
          {memoizedArtworks}
        </Artworks>
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
