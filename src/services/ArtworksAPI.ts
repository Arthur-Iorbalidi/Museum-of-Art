import axios from 'axios';

export interface IGetParams {
  page: number;
  limit: number;
  searchQuery: string;
  sort: string;
}

export interface IArtworksResponse {
  pagination: IPagination;
  data: IArtwork[];
}

export interface IFavoritesArtworksResponse {
  data: IArtwork[];
}

export interface IArtworkResponse {
  data: IArtwork;
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
  style_title: string;
  credit_line: string;
}

class ArtworksAPI {
  private baseUrl = 'https://api.artic.edu/api/v1/artworks';
  private fields =
    'id,title,artist_title,date_start,date_end,date_display,artist_display,place_of_origin,dimensions,image_id,style_title,credit_line';

  private api = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async get(params: IGetParams): Promise<IArtworksResponse> {
    if (params.searchQuery === '') {
      const response = await this.getArtworks(params);
      return response;
    }

    const response = await this.getArtworksByQuery(params);
    return response;
  }

  async getArtworks(params: IGetParams): Promise<IArtworksResponse> {
    const response = await this.api.get('', {
      params: {
        page: params.page,
        limit: params.limit,
        fields: this.fields,
      },
    });

    return response.data;
  }

  async getArtworksByQuery(params: IGetParams): Promise<IArtworksResponse> {
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

  async getArtworkById(id: string): Promise<IArtworkResponse> {
    const response = await this.api.get(`/${id}`, {
      params: {
        fields: this.fields,
      },
    });

    return response.data;
  }

  async getArtworksByIds(ids: number[]): Promise<IFavoritesArtworksResponse> {
    if (ids.length === 0) {
      return {
        data: [],
      };
    }

    const response = await this.api.get('', {
      params: {
        ids: ids,
        fields: this.fields,
      },
    });

    return response.data;
  }
}

const artworksAPI = new ArtworksAPI();
export default artworksAPI;
