import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente "Pokemon Details"', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { name } = pokemonList[0];
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const pokemonTitle = screen.getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(pokemonTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(summaryText).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { name, foundAt } = pokemonList[0];
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const locationSubtitle = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationSubtitle).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();

      const locationImgs = screen.queryAllByRole('img', { name: `${name} location` });
      expect(locationImgs[index]).toBeInTheDocument();
      expect(locationImgs[index].src).toBe(map);
    });
  });

  it('O usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    userEvent.click(favCheckbox);
    expect(starIcon).not.toBeInTheDocument();
  });
});
