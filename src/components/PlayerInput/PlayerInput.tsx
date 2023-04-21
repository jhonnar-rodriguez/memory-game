import { ReactElement, useState } from 'react';
import {
  Col,
  Button,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';

import { setItem } from '../../helpers';

type PlayerInputProps = {
  onHideModal: () => void;
  show: boolean;
};

export function PlayerInput({ onHideModal, show }: PlayerInputProps): ReactElement {
  const [name, setName] = useState('');

  const handleStartGame = () => {
    if (name.length === 0) {
      return;
    }

    setItem('name', name);
    onHideModal();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <Modal
        centered
        onHide={() => onHideModal()}
        show={show}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleStartGame}>
            <Form.Group>
              <Form.Control
                autoComplete="off"
                autoFocus
                onChange={handleNameChange}
                placeholder="John Doe"
                required
                type="text"
                value={name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="text-start" xs={6}>
                <Button
                  onClick={() => onHideModal()}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-end" xs={6}>
                <Button
                  disabled={name?.length === 0}
                  onClick={handleStartGame}
                  type="submit"
                  variant="primary"
                >
                  Start Game
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
