import { ReactElement, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { Instructions } from '../../components/Instructions';
import { PlayerInput } from '../../components/PlayerInput';
import { getItem } from '../../helpers';

export function Home(): ReactElement {
  const [displayInstructionsModal, setDisplayInstructionsModal] = useState<boolean>(false);
  const [displayPlayerInputModal, setDisplayPlayerInputModal] = useState<boolean>(false);
  const playerName = getItem<string>('name');

  if (playerName) {
    return <Navigate replace to="/play" />;
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1>Welcome to the Memory Game</h1>
          <p className="my-4">Test your memory by finding all the matching pairs!</p>
          <div className="d-grid gap-2">
            <Button onClick={() => setDisplayPlayerInputModal(true)} size="lg" variant="primary">
              Start Game
            </Button>
            <Button onClick={() => setDisplayInstructionsModal(true)} size="lg" variant="secondary">
              See Instructions
            </Button>
          </div>
        </Col>
      </Row>

      {
        displayInstructionsModal && (
          <Instructions
            onHideModal={() => setDisplayInstructionsModal(false)}
            show
          />
        )
      }

      {
        displayPlayerInputModal && (
          <PlayerInput
            onHideModal={() => setDisplayPlayerInputModal(false)}
            show
          />
        )
      }

    </Container>
  );
}
