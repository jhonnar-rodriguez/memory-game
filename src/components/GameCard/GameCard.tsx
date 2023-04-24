import { ReactElement } from 'react';
import { Card, Col } from 'react-bootstrap';

import notRevealedCardUrl from '../../assets/not-revealed-card.png';

import './GameCard.css';

type GameCardProps = {
  isRevealed: boolean;
  onCardClick: () => void;
  url: string;
};

export function GameCard({
  isRevealed,
  onCardClick,
  url,
}: GameCardProps): ReactElement {
  return (
    <Col>
      <Card
        border="warning"
        className="d-flex align-items-center card-container"
        onClick={() => onCardClick()}
      >
        <Card.Img
          className={isRevealed ? 'fade-in-image' : ''}
          src={isRevealed ? url : notRevealedCardUrl}
        />
      </Card>
    </Col>
  );
}
