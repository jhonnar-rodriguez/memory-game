import { ReactElement } from 'react';
import { Button, Modal } from 'react-bootstrap';

type InstructionsProps = {
  onHideModal: () => void,
  show: boolean;
};

export function Instructions({ onHideModal, show }: InstructionsProps): ReactElement {
  return (
    <div>
      <Modal
        centered
        onHide={() => onHideModal()}
        show={show}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A board with a group of cards face down and a marker with a space to show:
            Hits and Errors will be shown.
          </p>
          <ul>
            <li>Turn over two cards.</li>
            <li>
              If the cards match, they stay face up and 1 point will be added
              to the hits scoreboard.
            </li>
            <li>
              If the cards do not match, they are turned face down again and 1
              point will be added to the errors score.
            </li>
            <li>The game is over when all cards are face up.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHideModal()} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
