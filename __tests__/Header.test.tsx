import Header from '@components/Header/Header';
import useWindowWidth from '@hooks/useWindowWidth';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Оборачиваем в Router для использования Link

jest.mock('@hooks/useWindowWidth');

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation when window width is 550px or more', () => {
    useWindowWidth.mockReturnValue(550);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders burger menu button when window width is less than 550px', () => {
    useWindowWidth.mockReturnValue(400);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('toggles burger menu on click', () => {
    useWindowWidth.mockReturnValue(400);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
