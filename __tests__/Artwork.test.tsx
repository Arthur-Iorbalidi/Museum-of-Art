import Artwork from '@components/Artwork/Artwork';
import favouritesAPI from '@services/FavouritesAPI';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@services/FavouritesAPI');
jest.mock(
  '@assets/icons/alternative-img.svg',
  () => 'mocked-alternative-img.svg',
);

const mockArtwork = {
  id: 16568,
  title: 'Water Lilies',
  date_start: 1906,
  date_end: 1906,
  date_display: '1906',
  artist_display: 'Claude Monet (French, 1840–1926)',
  place_of_origin: 'France',
  dimensions:
    '89.9 × 94.1 cm (35 3/8 × 37 1/16 in.); Framed: 103.2 × 107 × 5.8 cm (40 5/8 × 42 1/8 × 2 1/4 in.)',
  credit_line: 'Mr. and Mrs. Martin A. Ryerson Collection',
  artist_title: 'Claude Monet',
  style_title: 'Impressionism',
  image_id: '3c27b499-af56-f0d5-93b5-a7f2f1ad5813',
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

    expect(screen.getByText('Water Lilies')).toBeInTheDocument();
    expect(screen.getByText('Claude Monet')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'artwork' })).toHaveAttribute(
      'src',
      'https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/843,/0/default.jpg',
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
