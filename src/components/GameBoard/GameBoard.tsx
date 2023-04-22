import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Row } from 'react-bootstrap';
import { shuffle } from 'lodash';

import { Card } from '../../types';
import { GameCard } from '../GameCard';
import { GameScore } from '../GameScore';
import { GameCompleted } from '../GameCompleted';

type GameBoardProps = {
  cards: Card[];
};

export function GameBoard({ cards }: GameBoardProps): ReactElement {
  const [boardCards, setBoardCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [solvedCards, setSolvedCards] = useState<number[]>([]);
  const [hits, setHits] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  const isGameCompleted = useMemo<boolean>(
    () => solvedCards.length === cards.length,
    [cards, solvedCards],
  );

  useEffect(() => {
    if (cards) {
      setBoardCards(shuffle(cards.concat(cards)));
    }
  }, [cards]);

  const handleClick = (index: number): void => {
    if (revealedCards.length === 2) {
      return;
    }

    setRevealedCards((prev) => [...prev, index]);
  };

  const validateRevealedCards = useCallback(
    (): void => {
      if (revealedCards.length === 2) {
        const [first, second] = revealedCards;

        if (boardCards[first].id === boardCards[second].id) {
          setSolvedCards((prev) => ([...prev, first, second]));
          setRevealedCards([]);
          setHits((prev) => prev + 1);

          return;
        }

        setMistakes((prev) => prev + 1);
        setTimeout(() => {
          setRevealedCards([]);
        }, 2000);
      }
    },
    [boardCards, revealedCards],
  );

  useEffect(() => {
    validateRevealedCards();
  }, [validateRevealedCards]);

  const handleRestartGame = useCallback((): void => {
    setRevealedCards([]);
    setSolvedCards([]);
    setHits(0);
    setMistakes(0);
    setBoardCards(shuffle(cards.concat(cards)));
  }, [cards]);

  return (
    <>
      {
        !isGameCompleted && (
          <div className="mt-5 mb-5">
            <GameScore hits={hits} mistakes={mistakes} />

            <Row className="g-2 fluid-container" lg={6} md={5} xs={2}>
              {
                boardCards.map((card: Card, index: number) => (
                  <GameCard
                    isRevealed={revealedCards.includes(index) || solvedCards.includes(index)}
                    key={`${card.id}-${index}`}
                    onCardClick={() => handleClick(index)}
                    url={card.image}
                  />
                ))
              }
            </Row>
          </div>
        )
      }

      {
        isGameCompleted && <GameCompleted onRestartGame={() => handleRestartGame()} />
      }
    </>
  );
}
