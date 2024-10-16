import Sorting from '@components/Sorting/Sorting';
import sortOptions from '@constants/sortOptions';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('Sorting Component', () => {
  const mockHandleChangeSorting = jest.fn();

  beforeEach(() => {
    render(<Sorting handleChangeSorting={mockHandleChangeSorting} />);
  });

  test('renders sorting options', () => {
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    expect(selectElement).toBeInTheDocument();
    expect(selectElement.options.length).toBe(sortOptions.length);

    sortOptions.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.tittle }),
      ).toBeInTheDocument();
    });
  });

  test('calls handleChangeSorting on option change', () => {
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, {
      target: { value: sortOptions[1].value },
    });

    expect(mockHandleChangeSorting).toHaveBeenCalledWith(sortOptions[1].value);
  });
});
