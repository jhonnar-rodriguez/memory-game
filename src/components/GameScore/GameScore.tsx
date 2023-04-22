import { ReactElement } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

type GameScoreProps = {
  hits: number;
  mistakes: number;
};

export function GameScore({ hits, mistakes }: GameScoreProps): ReactElement {
  return (
    <Row className="d-flex flex-row mb-5">
      <Col className="text-md-end text-lg-end text-xl-end text-center" md={6} xs={12}>
        <h4>
          Hits:
          {' '}
          <Badge bg="info">{hits}</Badge>
        </h4>
      </Col>
      <Col className="text-md-start text-lg-start text-xl-start text-center" md={6} xs={12}>
        <h4>
          Mistakes:
          {' '}
          <Badge bg="danger">{mistakes}</Badge>
        </h4>
      </Col>
    </Row>
  );
}
