import storageAPI from './storage';

class FavouritesAPI {
  private fieldName = 'favorites';

  constructor() {
    const favorites = storageAPI.get(this.fieldName);
    if (favorites === null) {
      storageAPI.set(this.fieldName, JSON.stringify([]));
    }
  }

  addToFavourites(id: number) {
    const favorites: number[] = this.getFavorites();

    const updatedFavorites = [...favorites, id];

    this.setFavorites(updatedFavorites);
  }

  removeFromFavourites(id: number) {
    const favorites: number[] = this.getFavorites();

    const updatedFavorites = favorites.filter((item) => item !== id);

    this.setFavorites(updatedFavorites);
  }

  isInFavorites(id: number) {
    const favorites: number[] = this.getFavorites();

    return favorites.includes(id);
  }

  getFavorites(): number[] {
    return JSON.parse(storageAPI.get(this.fieldName)!);
  }

  setFavorites(favorites: number[]) {
    storageAPI.set(this.fieldName, JSON.stringify(favorites));
  }
}

const favouritesAPI = new FavouritesAPI();
export default favouritesAPI;
