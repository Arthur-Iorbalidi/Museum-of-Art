import { IGetParams } from '@services/ArtworksAPI';

export const defaultSearchValues: IGetParams = {
  page: 1,
  limit: 3,
  searchQuery: '',
  sort: '',
};

export const maxPageNumber = 10000;
