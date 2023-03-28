import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente "App", se a aplicação:', () => {
  it('Contém um conjunto fixo de links de navegação no topo', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonLink).toBeInTheDocument();
  });

  it('É redirecionada para a página inicial, na URL "/" ao clicar no link "Home" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('É redirecionada para a página de "About", na URL "/about" ao clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('É redirecionada para a página de "Pokémon Favoritados", na URL "/favorites" ao clicar no link "Favorite Pokémon" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favPokemonLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('É redirecionada para a página "Not Found" ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('error');
    });
    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const notFoundImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
  });
});
