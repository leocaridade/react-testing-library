import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const pathToMoreDetails = () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLink);
};

describe('Testa o componente "Pokemon"', () => {
  it('É renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const { name, type, averageWeight, image } = pokemonList[0];
    const { value, measurementUnit } = averageWeight;
    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(type);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(image);
  });

  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const { id } = pokemonList[0];
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.href).toBe(`http://localhost/pokemon/${id}`);
  });

  it('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = pokemonList[0];
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(`/pokemon/${id}`);
    const detailsTitle = screen.getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(detailsTitle).toBeInTheDocument();
  });

  it('Existe um ícone de estrela nos Pokémon favoritados', () => {
    pathToMoreDetails();
    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
