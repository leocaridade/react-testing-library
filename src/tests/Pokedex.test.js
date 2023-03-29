import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente "Pokedex"', () => {
  it('A renderização dos elementos na tela', () => {
    renderWithRouter(<App />);
    const subtitle = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(subtitle).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemonList.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemonBtn);
    });
    const firstPokemonOnTheList = screen.getByText(/pikachu/i);
    expect(firstPokemonOnTheList).toBeInTheDocument();
  });

  it('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

  it('A pokédex possui os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const AllButton = screen.getByRole('button', { name: /all/i });

    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    expect(AllButton).toBeInTheDocument();

    pokemonList.forEach(({ type }) => {
      const filterBtn = screen.getByRole('button', { name: type });
      userEvent.click(filterBtn);
      expect(screen.getAllByText(type).length).toBe(2);
      expect(AllButton).toBeInTheDocument();
    });
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const AllBtn = screen.getByRole('button', { name: /all/i });
    expect(AllBtn).toBeInTheDocument();
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();

    const fireBtn = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    userEvent.click(AllBtn);
    pokemonList.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemonBtn);
    });
  });
});
