import favouritesAPI from '@services/FavouritesAPI';
import storageAPI from '@services/storageAPI';

describe('FavouritesAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add an item to favorites', () => {
    jest.spyOn(storageAPI, 'get').mockReturnValue(JSON.stringify([1, 2]));
    jest.spyOn(storageAPI, 'set').mockImplementation(jest.fn());

    favouritesAPI.addToFavourites(3);

    expect(storageAPI.set).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([1, 2, 3]),
    );
  });

  test('should remove an item from favorites', () => {
    jest.spyOn(storageAPI, 'get').mockReturnValue(JSON.stringify([1, 2, 3]));
    jest.spyOn(storageAPI, 'set').mockImplementation(jest.fn());

    favouritesAPI.removeFromFavourites(2);

    expect(storageAPI.set).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([1, 3]),
    );
  });

  test('should return true if item is in favorites', () => {
    jest.spyOn(storageAPI, 'get').mockReturnValue(JSON.stringify([1, 2, 3]));

    const result = favouritesAPI.isInFavorites(2);

    expect(result).toBe(true);
  });

  test('should return false if item is not in favorites', () => {
    jest.spyOn(storageAPI, 'get').mockReturnValue(JSON.stringify([1, 2, 3]));

    const result = favouritesAPI.isInFavorites(4);

    expect(result).toBe(false);
  });

  test('should return parsed favorites from storage', () => {
    jest.spyOn(storageAPI, 'get').mockReturnValue(JSON.stringify([1, 2, 3]));

    const result = favouritesAPI.getFavorites();

    expect(result).toEqual([1, 2, 3]);
  });

  test('should store updated favorites in storage', () => {
    const newFavorites = [1, 2, 3];

    favouritesAPI.setFavorites(newFavorites);

    expect(storageAPI.set).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify(newFavorites),
    );
  });
});
