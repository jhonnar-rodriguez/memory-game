import { ReactElement, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { Instructions } from '../../components/Instructions';

export function Home(): ReactElement {
  const [displayInstructionsModal, setDisplayInstructionsModal] = useState<boolean>(false);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1>Welcome to the Memory Game</h1>
          <p className="my-4">Test your memory by finding all the matching pairs!</p>
          <div className="d-grid gap-2">
            <Button size="lg" variant="primary">
              Start Game
            </Button>
            <Button onClick={() => setDisplayInstructionsModal(true)} size="lg" variant="secondary">
              See Instructions
            </Button>
          </div>
        </Col>
      </Row>

      <Instructions
        onHideModal={() => setDisplayInstructionsModal(false)}
        show={displayInstructionsModal}
      />
    </Container>
  );
}
