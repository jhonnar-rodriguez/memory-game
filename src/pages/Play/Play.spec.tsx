import _ from 'lodash';
import {
  fireEvent,
  render,
  screen,
  waitFor,

} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as hooks from '../../hooks';
import { Play } from './Play';
import { cardsToTestGameIsCompleted, cardsToTestHits, defaultCards } from '../../../tests/__mocks__';

describe('Play Page', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading component when cards are loading', () => {
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([[], true, '']));

    const { container } = render(<Play />);

    expect(container.getElementsByClassName('spinner-grow').length).toBe(1);
  });

  test('renders error and notification components when cards could not be fetched', () => {
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([[], false, 'Invalid settings']));

    render(<Play />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/if the problem persists./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
    expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
  });

  test('renders game board when cards are fetched successfully', () => {
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([defaultCards, false, '']));

    const { container } = render(<Play />);

    // As the set of cards are duplicated, there should be 6 images
    expect(container.getElementsByClassName('card-img').length).toBe(6);
    expect(container.getElementsByClassName('card-container').length).toBe(6);
    expect(screen.getByRole('heading', { name: /hits/i })).toBeInTheDocument();
    expect(container.getElementsByClassName('badge bg-info').length).toBe(1);
    expect(screen.getByRole('heading', { name: /mistakes/i })).toBeInTheDocument();
    expect(container.getElementsByClassName('badge bg-danger').length).toBe(1);
  });

  test('should the mistakes badge be increased while revealing a not matching card', () => {
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([defaultCards, false, '']));

    const { container } = render(<Play />);

    const cards = container.getElementsByClassName('card-container');

    act(() => {
      fireEvent.click(cards[0]);
      fireEvent.click(cards[1]);
    });

    const hitsBadge = container.getElementsByClassName('badge bg-info');
    const mistakesBadge = container.getElementsByClassName('badge bg-danger');

    expect(mistakesBadge.length).toBe(1);
    expect(Number(mistakesBadge[0].textContent)).toBe(1);
    expect(hitsBadge.length).toBe(1);
    expect(Number(hitsBadge[0].textContent)).toBe(0);
  });

  test('should the hits badge be increased by one while revealing a matching card', async () => {
    const mockedCards = cardsToTestHits.concat(cardsToTestHits);
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([defaultCards, false, '']));
    _.shuffle = vi.fn().mockReturnValueOnce(mockedCards);

    const { container } = render(<Play />);

    const cards = container.getElementsByClassName('card-container');

    const firstCardIndex = mockedCards.findIndex(({ id }) => id === 1);
    const lastCardIndex = mockedCards.findLastIndex(({ id }) => id === 1);

    act(() => {
      fireEvent.click(cards[firstCardIndex]);
      fireEvent.click(cards[lastCardIndex]);
    });

    const hitsBadge = container.getElementsByClassName('badge bg-info');
    const mistakesBadge = container.getElementsByClassName('badge bg-danger');

    expect(_.shuffle).toHaveBeenCalled();
    expect(hitsBadge.length).toBe(1);
    expect(Number(hitsBadge[0].textContent)).toBe(1);
    expect(mistakesBadge.length).toBe(1);
    expect(Number(mistakesBadge[0].textContent)).toBe(0);
  });

  test('should the game be finished after matching all cards', async () => {
    const mockedCards = cardsToTestGameIsCompleted.concat(cardsToTestGameIsCompleted);
    vi.spyOn(hooks, 'useGetCards').mockImplementationOnce(() => ([defaultCards, false, '']));
    _.shuffle = vi.fn().mockReturnValueOnce(mockedCards);

    const { container, getByRole, queryByText } = render(<Play />);

    const cards = container.getElementsByClassName('card-container');

    const firstCardIndex = mockedCards.findIndex(({ id }) => id === 1);
    const lastCardIndex = mockedCards.findLastIndex(({ id }) => id === 1);

    act(() => {
      fireEvent.click(cards[firstCardIndex]);
      fireEvent.click(cards[lastCardIndex]);
    });

    const hitsBadge = container.getElementsByClassName('badge bg-info');
    const mistakesBadge = container.getElementsByClassName('badge bg-danger');
    const congratulationMessage = getByRole('heading', { name: /congratulations/i });
    const gameCompletedMessage = queryByText(/you have completed/i);

    expect(_.shuffle).toHaveBeenCalled();
    expect(hitsBadge.length).toBe(0);
    expect(mistakesBadge.length).toBe(0);
    expect(congratulationMessage).toBeInTheDocument();
    expect(gameCompletedMessage).toBeInTheDocument();
  });

  test('should the restart game button be working once the game has finished', async () => {
    const mockedCards = cardsToTestGameIsCompleted.concat(cardsToTestGameIsCompleted);
    vi.spyOn(hooks, 'useGetCards').mockImplementation(() => ([defaultCards, false, '']));
    _.shuffle = vi.fn().mockReturnValue(mockedCards);

    const { container, getByRole, queryByText } = render(<Play />);

    const cards = container.getElementsByClassName('card-container');

    const firstCardIndex = mockedCards.findIndex(({ id }) => id === 1);
    const lastCardIndex = mockedCards.findLastIndex(({ id }) => id === 1);

    act(() => {
      fireEvent.click(cards[firstCardIndex]);
      fireEvent.click(cards[lastCardIndex]);
    });

    const hitsBadge = container.getElementsByClassName('badge bg-info');
    const mistakesBadge = container.getElementsByClassName('badge bg-danger');
    const congratulationMessage = getByRole('heading', { name: /congratulations/i });
    const gameCompletedMessage = queryByText(/you have completed/i);
    const restartGameButton = screen.getByRole('button', { name: /restart game/i });

    expect(_.shuffle).toHaveBeenCalled();
    expect(hitsBadge.length).toBe(0);
    expect(mistakesBadge.length).toBe(0);
    expect(congratulationMessage).toBeInTheDocument();
    expect(gameCompletedMessage).toBeInTheDocument();
    expect(restartGameButton).toBeInTheDocument();

    fireEvent.click(restartGameButton);

    waitFor(() => {
      // Wait until the Play component loads again to run new assertions
      expect(screen.getByRole('heading', { name: /hits/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /mistakes/i })).toBeInTheDocument();
    });
  });
});
