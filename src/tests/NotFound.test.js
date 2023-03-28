import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const NOT_FOUND_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testa o componente "Not Found"', () => {
  it('A página contém um heading "h2" com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('digimon');
    });
    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const notFoundImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
      src: NOT_FOUND_SRC,
    });

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe(NOT_FOUND_SRC);
  });
});
