import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { getItem } from '../../helpers';

type GameCompletedProps = {
  onRestartGame: () => void;
};

export function GameCompleted({ onRestartGame }: GameCompletedProps) {
  const playerName = getItem<string>('name');

  return (
    <Container className="app-container d-flex flex-column justify-content-center align-items-center mt-5">
      <Row>
        <Col className="text-center">
          <h1>Congratulations!</h1>
          <p>
            {playerName}
            {' '}
            you have completed the game.
          </p>
          <Button
            className="mt-3"
            onClick={onRestartGame}
            variant="primary"
          >
            Restart Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
