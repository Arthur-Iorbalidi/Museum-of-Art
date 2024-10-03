import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailedPage from '@pages/DetailedPage/DetailedPage';
import artworksAPI from '@services/ArtworksAPI';
import favouritesAPI from '@services/FavouritesAPI';
import React from 'react';

jest.mock('@services/ArtworksAPI');
jest.mock('@services/FavouritesAPI');

const mockArtwork = {
  data: {
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
  },
};

describe('DetailedPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    favouritesAPI.isInFavorites.mockReturnValue(false);
  });

  test('renders loading state initially', () => {
    artworksAPI.getArtworkById.mockResolvedValueOnce(null);
    render(
      <MemoryRouter initialEntries={['/artwork/16568']}>
        <DetailedPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();
  });

  test('renders artwork details when data is fetched', async () => {
    artworksAPI.getArtworkById.mockResolvedValueOnce(mockArtwork);
    render(
      <MemoryRouter initialEntries={['/artwork/1']}>
        <DetailedPage />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText('Water Lilies')).toBeInTheDocument(),
    );
    expect(screen.getByText('Claude Monet')).toBeInTheDocument();
    expect(screen.getByText('1906')).toBeInTheDocument();
    expect(screen.getByText('Impressionism')).toBeInTheDocument();
  });
});
