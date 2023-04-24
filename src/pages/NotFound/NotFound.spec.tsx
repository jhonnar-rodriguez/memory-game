import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFound } from './NotFound';

const mockedNavigation = vi.fn();

vi.mock('react-router-dom', async () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(await vi.importActual('react-router-dom') as any),
  useNavigate: () => mockedNavigation,
}));

describe('NotFound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the not found message', () => {
    render(
      <MemoryRouter initialEntries={['/not-found-url']}>
        <NotFound />
      </MemoryRouter>,
    );

    const notFoundMessage = screen.getByText('Page Not Found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('renders the return to home button', () => {
    render(<NotFound />);
    const returnToHomeButton = screen.getByRole('button', {
      name: 'Return to Home',
    });

    expect(returnToHomeButton).toBeInTheDocument();
  });

  test('clicking the return to home button navigates to the home page', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const returnToHomeButton = screen.getByRole('button', {
      name: 'Return to Home',
    });

    fireEvent.click(returnToHomeButton);
    expect(mockedNavigation).toHaveBeenCalledWith('/');
  });
});
