/* eslint-disable react/prop-types */
import Artworks from '@components/Artworks/Artworks';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('@components/Artwork/Artwork', () => {
  return function MockArtwork({ artwork }) {
    return <div data-testid="artwork">{artwork.title}</div>;
  };
});

describe('Artworks Component', () => {
  test('should render Loader when isLoading is true', () => {
    render(<Artworks isLoading={true}></Artworks>);

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();
  });
});
