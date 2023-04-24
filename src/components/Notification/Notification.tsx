import { ReactElement, useState } from 'react';
import {
  Col,
  Row,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';

type NotificationProps = {
  header?: string;
  message: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  position?: ToastPosition;
};

export function Notification({
  header,
  message,
  variant,
  position = 'bottom-center',
}: NotificationProps): ReactElement {
  const [show, setShow] = useState<boolean>(message.length > 0);

  return (
    <Row>
      <Col xs={12}>
        <ToastContainer className="p-3" position={position}>
          <Toast autohide bg={variant} className="d-inline-block m-1" onClose={() => setShow(false)} show={show}>
            {
              header && (
                <Toast.Header>
                  <strong className="me-auto">{header}</strong>
                </Toast.Header>
              )
            }
            <Toast.Body className={variant === 'dark' ? 'text-white' : ''}>
              {message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}
