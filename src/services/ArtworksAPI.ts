import {
  IArtworkResponse,
  IArtworksResponse,
  IError,
  IFavoritesArtworksResponse,
  IGetParams,
} from '@localTypes/ArtworksAPITypes';
import axios from 'axios';

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

  async getArtworks(params: IGetParams): Promise<IArtworksResponse> {
    try {
      if (params.searchQuery === '') {
        const response = await this.getDefaultArtworks(params);
        return response;
      }

      const response = await this.getArtworksByQuery(params);
      return response;
    } catch (error) {
      return {
        error: error as IError,
      };
    }
  }

  async getDefaultArtworks(params: IGetParams): Promise<IArtworksResponse> {
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
    try {
      const response = await this.api.get(`/${id}`, {
        params: {
          fields: this.fields,
        },
      });

      return response.data;
    } catch (error) {
      return {
        error: error as IError,
      };
    }
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
