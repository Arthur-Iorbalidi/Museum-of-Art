interface IGetParams {
  page: number;
  limit: number;
  searchQuery: string;
  sort: string;
}

interface IArtworksResponse {
  pagination?: IPagination;
  data?: IArtwork[];
  error?: IError;
}

interface IFavoritesArtworksResponse {
  data: IArtwork[];
}

interface IArtworkResponse {
  data?: IArtwork;
  error?: IError;
}

interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

interface IArtwork {
  _score: number;
  date_start: number;
  artist_display: string;
  date_display: string;
  date_end: number;
  artist_title: string;
  id: number;
  image_id: string;
  title: string;
  place_of_origin: string;
  dimensions: string;
  style_title: string;
  credit_line: string;
}

interface IError {
  message: string;
  response: {
    data: {
      detail?: string;
      error: string;
      status: number;
    };
  };
}

export type {
  IArtwork,
  IArtworkResponse,
  IArtworksResponse,
  IError,
  IFavoritesArtworksResponse,
  IGetParams,
  IPagination,
};
