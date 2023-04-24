import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate } from 'react-router-dom';

import { Home } from './Home';

vi.mock('react-router-dom', async () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(await vi.importActual('react-router-dom') as any),
  Navigate: vi.fn().mockImplementation(() => <div>Mocked Navigation</div>),
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Home component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const welcomeMessage = screen.getByRole('heading', { name: /welcome to the memory game/i });
    const startGameButton = screen.getByRole('button', { name: /start game/i });
    const seeInstructionsButton = screen.getByRole('button', { name: /see instructions/i });

    expect(welcomeMessage).toBeInTheDocument();
    expect(startGameButton).toBeInTheDocument();
    expect(seeInstructionsButton).toBeInTheDocument();
  });

  it('should navigate to /play if playerName is in local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      const returnValue = 'test user';

      JSON.parse = vi.fn().mockReturnValueOnce(returnValue);

      return returnValue;
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );

    expect(Navigate).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Mocked Navigation/i)).toBeInTheDocument();
  });

  it('should show the player input modal when start game button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/enter your name/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    expect(screen.getByText(/enter your name/i)).toBeInTheDocument();
  });

  it('should show the instructions modal when see instructions button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/turn over two cards/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /see instructions/i }));
    expect(screen.queryByText(/turn over two cards/i)).toBeInTheDocument();
    expect(screen.queryByText(/the game is over when all cards are face up./i)).toBeInTheDocument();
  });
});
