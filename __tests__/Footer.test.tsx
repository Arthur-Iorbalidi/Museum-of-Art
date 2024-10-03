import { render, screen } from '@testing-library/react';
import Footer from '@components/Footer/Footer';
import React from 'react';

describe('Footer Component', () => {
  test('contains author name', () => {
    render(<Footer />);

    const name = screen.getByText('Arthur Iorbalidi');
    expect(name).toBeInTheDocument();
  });

  test('contains GitHub link', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github link/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Arthur-Iorbalidi',
    );
  });

  test('contains LinkedIn link', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /linkedin link/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/arthur-iorbalidi-094340309/',
    );
  });

  test('contains Github and LinkedIn logos', () => {
    render(<Footer />);

    const githubLogo = screen.getByRole('img', { name: 'github link' });
    const linkedInLogo = screen.getByRole('img', { name: 'linkedin link' });
    expect(githubLogo).toBeInTheDocument();
    expect(linkedInLogo).toBeInTheDocument();
  });
});
