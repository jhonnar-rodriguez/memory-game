import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="app-container d-flex flex-column justify-content-center align-items-center mt-5">
      <Row>
        <Col className="text-center">
          <h1>Page Not Found</h1>
          <p>
            Sorry, the page you are looking for could not be found.
          </p>
          <Button
            className="mt-3"
            onClick={() => navigate('/')}
            variant="primary"
          >
            Return to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
