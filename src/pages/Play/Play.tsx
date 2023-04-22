import { ReactElement } from 'react';
import { Container } from 'react-bootstrap';

import { DEFAULT_ERROR_MESSAGE } from '../../config/constants';
import { Error } from '../../components/Error';
import { GameBoard } from '../../components/GameBoard';
import { Loading } from '../../components/Loading';
import { Notification } from '../../components/Notification';
import { useGetCards } from '../../hooks';

export function Play(): ReactElement {
  const [cards, isLoading, error] = useGetCards();
  const hasError = !isLoading && Boolean(error);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return (
      <>
        <Error />
        <Notification message={DEFAULT_ERROR_MESSAGE} variant="danger" />
      </>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <GameBoard cards={cards} />
    </Container>
  );
}
