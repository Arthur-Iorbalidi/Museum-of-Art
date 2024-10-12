import artworksAPI from './ArtworksAPI';
import storageAPI from './storageAPI';

class FavouritesAPI {
  private fieldName = 'favorites';

  constructor() {
    const favorites = storageAPI.get(this.fieldName);
    if (favorites === null) {
      storageAPI.set(this.fieldName, JSON.stringify([]));
    }
  }

  addToFavourites(id: number) {
    const favorites: number[] = this.getFavoritesIds();

    const updatedFavorites = [...favorites, id];

    this.setFavorites(updatedFavorites);
  }

  removeFromFavourites(id: number) {
    const favorites: number[] = this.getFavoritesIds();

    const updatedFavorites = favorites.filter((item) => item !== id);

    this.setFavorites(updatedFavorites);
  }

  isInFavorites(id: number) {
    const favorites: number[] = this.getFavoritesIds();

    return favorites.includes(id);
  }

  getFavoritesIds(): number[] {
    return JSON.parse(storageAPI.get(this.fieldName)!);
  }

  setFavorites(favorites: number[]) {
    storageAPI.set(this.fieldName, JSON.stringify(favorites));
  }

  async getFavoritesArtworks() {
    const response = await artworksAPI.getArtworksByIds(this.getFavoritesIds());

    return response;
  }
}

const favouritesAPI = new FavouritesAPI();
export default favouritesAPI;
