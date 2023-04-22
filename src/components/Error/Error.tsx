import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

type ErrorProps = {
  buttonText?: string;
  header?: string;
  onButtonClick?: () => void;
  message?: string;
};

export function Error({
  buttonText = 'Reload page',
  header = 'Error!',
  onButtonClick = () => window.location.reload(),
  message = 'If the problem persists, please contact the system administrator.',
}: ErrorProps) {
  return (
    <Container className="app-container d-flex flex-column justify-content-center align-items-center mt-5">
      <Row>
        <Col className="text-center">
          <h1>{header}</h1>
          <p>{message}</p>
          <Button
            className="mt-3"
            onClick={onButtonClick}
            variant="primary"
          >
            {buttonText}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
