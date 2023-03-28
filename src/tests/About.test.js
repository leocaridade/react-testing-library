import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pathToAbout = () => {
  renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: /about/i });
  userEvent.click(aboutLink);
};

const POKEDEX_IMG_SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testa o componente "About", se a página contém:', () => {
  it('As informações sobre a Pokédex', () => {
    pathToAbout();
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const firstParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    const pokedexImg = screen.getByRole('img', {
      src: POKEDEX_IMG_SRC,
      name: /pokédex/i,
    });

    expect(aboutTitle).toBeInTheDocument();
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
