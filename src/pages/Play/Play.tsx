import { ReactElement } from 'react';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';

export function Play(): ReactElement {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <Row>
        <Col className="text-center">
          <h1>Play Page</h1>
        </Col>
      </Row>
    </Container>
  );
}
