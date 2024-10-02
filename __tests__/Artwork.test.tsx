import { render, screen, fireEvent } from '@testing-library/react';
import Artwork from '@pages/HomePage/components/Artworks/components/Artwork/Artwork';
import favouritesAPI from '@services/FavouritesAPI';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@services/FavouritesAPI');
jest.mock(
  '@assets/icons/alternative-img.svg',
  () => 'mocked-alternative-img.svg',
);

const mockArtwork = {
  id: '1',
  title: 'Starry Night',
  artist_title: 'Vincent van Gogh',
  image_id: '12345',
};

describe('Artwork Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders artwork details', () => {
    render(
      <MemoryRouter>
        <Artwork artwork={mockArtwork} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Starry Night')).toBeInTheDocument();
    expect(screen.getByText('Vincent van Gogh')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'artwork' })).toHaveAttribute(
      'src',
      'https://www.artic.edu/iiif/2/12345/full/843,/0/default.jpg',
    );
  });

  test('renders alternative image on error', () => {
    render(
      <MemoryRouter>
        <Artwork artwork={mockArtwork} />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img', { name: 'artwork' });

    fireEvent.error(img);

    expect(img).toHaveAttribute('src', 'mocked-alternative-img.svg');
  });

  test('adds artwork to favorites', () => {
    favouritesAPI.isInFavorites.mockReturnValueOnce(false);
    render(
      <MemoryRouter>
        <Artwork artwork={mockArtwork} />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(favouritesAPI.addToFavourites).toHaveBeenCalledWith(mockArtwork.id);
    expect(favouritesAPI.removeFromFavourites).not.toHaveBeenCalled();
  });

  test('removes artwork from favorites', () => {
    favouritesAPI.isInFavorites.mockReturnValueOnce(true);
    render(
      <MemoryRouter>
        <Artwork artwork={mockArtwork} />
      </MemoryRouter>,
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(favouritesAPI.removeFromFavourites).toHaveBeenCalledWith(
      mockArtwork.id,
    );
    expect(favouritesAPI.addToFavourites).not.toHaveBeenCalled();
  });
});
