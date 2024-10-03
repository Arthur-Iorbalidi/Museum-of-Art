import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@pages/HomePage/components/Pagination/Pagination';
import { IPagination } from '@services/ArtworksAPI';
import React from 'react';

describe('Pagination Component', () => {
  const mockHandleChangePage = jest.fn();

  const defaultPagination: IPagination = {
    total: 100,
    limit: 10,
    offset: 0,
    total_pages: 10,
    current_page: 5,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination buttons correctly', () => {
    render(
      <Pagination
        pagination={defaultPagination}
        handleChangePage={mockHandleChangePage}
      />,
    );

    expect(screen.getByAltText(/previos/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByAltText(/next/i)).toBeInTheDocument();
  });

  it('should call handleChangePage with -1 when clicking the previous button', () => {
    render(
      <Pagination
        pagination={defaultPagination}
        handleChangePage={mockHandleChangePage}
      />,
    );

    fireEvent.click(screen.getByAltText(/previos/i));
    expect(mockHandleChangePage).toHaveBeenCalledWith(-1);
  });

  it('should call handleChangePage with 1 when clicking the next button', () => {
    render(
      <Pagination
        pagination={defaultPagination}
        handleChangePage={mockHandleChangePage}
      />,
    );

    fireEvent.click(screen.getByAltText(/next/i));
    expect(mockHandleChangePage).toHaveBeenCalledWith(1);
  });

  it('should render pagination items correctly', () => {
    render(
      <Pagination
        pagination={defaultPagination}
        handleChangePage={mockHandleChangePage}
      />,
    );

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('should not render previous button if on first page', () => {
    const paginationAtFirstPage = { ...defaultPagination, current_page: 1 };
    render(
      <Pagination
        pagination={paginationAtFirstPage}
        handleChangePage={mockHandleChangePage}
      />,
    );

    expect(screen.queryByAltText(/previos/i)).not.toBeInTheDocument();
  });

  it('should not render next button if on last page', () => {
    const paginationAtLastPage = { ...defaultPagination, current_page: 10 };
    render(
      <Pagination
        pagination={paginationAtLastPage}
        handleChangePage={mockHandleChangePage}
      />,
    );

    expect(screen.queryByAltText(/next/i)).not.toBeInTheDocument();
  });
});
