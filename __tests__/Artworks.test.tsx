/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import Artworks from '@pages/HomePage/components/Artworks/Artworks';
import { IArtwork } from '@services/ArtworksAPI';
import React from 'react';

jest.mock(
  '../src/pages/HomePage/components/Artworks/components/Artwork/Artwork',
  () => {
    return function MockArtwork({ artwork }) {
      return <div data-testid="artwork">{artwork.title}</div>;
    };
  },
);

describe('Paintings Component', () => {
  test('should render Loader when isLoading is true', () => {
    render(<Artworks artworks={undefined} isLoading={true} />);

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();
  });

  test('should render artworks when provided', () => {
    const mockArtworks: IArtwork[] = [
      {
        _score: 204.34451,
        credit_line: 'Mr. and Mrs. Martin A. Ryerson Collection',
        date_start: 1906,
        artist_display: 'Claude Monet (French, 1840–1926)',
        date_display: '1906',
        date_end: 1906,
        style_title: 'Impressionism',
        artist_title: 'Claude Monet',
        id: 16568,
        image_id: '3c27b499-af56-f0d5-93b5-a7f2f1ad5813',
        title: 'Water Lilies',
        place_of_origin: 'France',
        dimensions:
          '89.9 × 94.1 cm (35 3/8 × 37 1/16 in.); Framed: 103.2 × 107 × 5.8 cm (40 5/8 × 42 1/8 × 2 1/4 in.)',
      },
      {
        _score: 189.32585,
        credit_line: 'Mr. and Mrs. Martin A. Ryerson Collection',
        date_start: 1877,
        artist_display: 'Claude Monet (French, 1840–1926)',
        date_display: '1877',
        date_end: 1877,
        style_title: 'Impressionism',
        artist_title: 'Claude Monet',
        id: 16571,
        image_id: '0f1cc0e0-e42e-be16-3f71-2022da38cb93',
        title: 'Arrival of the Normandy Train, Gare Saint-Lazare',
        place_of_origin: 'France',
        dimensions:
          '60.3 × 80.2 cm (23 3/4 × 31 1/2 in.); Framed: 80.7 × 100.4 × 10.2 cm (31 3/4 × 39 1/2 × 4 in.)',
      },
    ];

    render(<Artworks artworks={mockArtworks} isLoading={false} />);

    expect(screen.getByText('Water Lilies')).toBeInTheDocument();
    expect(
      screen.getByText('Arrival of the Normandy Train, Gare Saint-Lazare'),
    ).toBeInTheDocument();
  });

  test('should not render any Artwork when artworks is empty', () => {
    render(<Artworks artworks={[]} isLoading={false} />);

    const artworks = screen.queryAllByTestId('artwork');
    expect(artworks.length).toBe(0);
  });
});
