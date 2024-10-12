import { IGetParams } from '@localTypes/ArtworksAPITypes';

const defaultSearchValues: IGetParams = {
  page: 1,
  limit: 3,
  searchQuery: '',
  sort: '',
};

const debounceInterval = 500;

export { debounceInterval, defaultSearchValues };
