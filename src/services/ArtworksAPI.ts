import axios from 'axios';

export interface IGetParams {
  page: number;
  limit: number;
  searchQuery: string;
  sort: string;
}

export interface IResponse {
  pagination: IPagination;
  data: IArtwork[];
}

export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface IArtwork {
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
}

class ArtworksAPI {
  private baseUrl = 'https://api.artic.edu/api/v1/artworks';
  private fields =
    'id,title,artist_title,date_start,date_end,date_display,artist_display,place_of_origin,dimensions,image_id';

  api = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async get(params: IGetParams): Promise<IResponse> {
    if (params.searchQuery === '') {
      const response = await this.getArtworks(params);
      return response;
    }

    const response = await this.getArtworksByQuery(params);
    return response;
  }

  async getArtworks(params: IGetParams): Promise<IResponse> {
    const response = await this.api.get('', {
      params: {
        page: params.page,
        limit: params.limit,
        fields: this.fields,
      },
    });

    return response.data;
  }

  async getArtworksByQuery(params: IGetParams): Promise<IResponse> {
    const response = await this.api.get('/search', {
      params: {
        ...(params.searchQuery !== '' ? { q: params.searchQuery } : {}),
        ...(params.sort !== '' ? { sort: params.sort } : {}),
        page: params.page,
        limit: params.limit,
        fields: this.fields,
      },
    });

    return response.data;
  }
}

const artworksAPI = new ArtworksAPI();
export default artworksAPI;
