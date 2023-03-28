import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente "FavoritePokemon"', () => {
  it('É exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favPokemonLink);
    const noFavoriteText = screen.getByText(/no favorite pokémon found/i);

    expect(noFavoriteText).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favCheckbox);
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favPokemonLink);
    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByText(/electric/i);
    const pokemonGif = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonGif).toBeInTheDocument();
  });
});
