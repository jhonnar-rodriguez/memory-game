import { useEffect, useState } from 'react';

import appVariables from '../config/app-variables';
import { DEFAULT_ERROR_MESSAGE } from '../config/constants';
import { Card, FetchedCard } from '../types';

export const useGetCards = (): [Card[], boolean, string | undefined] => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${appVariables.CARDS_BASE_URL}?per_page=${appVariables.CARDS_PER_PAGE}`,
        );
        const data = await response.json();
        const cardsData: Card[] = data.entries.map(
          ({ fields: { image } }: FetchedCard) => ({
            id: image.uuid,
            image: image.url,
            isRevealed: false,
            name: image.title,
          }),
        );

        // Left this here just to be able to see the loading state
        setTimeout(() => {
          setCards(cardsData);
          setIsLoading(false);
        }, 1000);
      } catch (resp) {
        setIsLoading(false);
        setError(DEFAULT_ERROR_MESSAGE);
      }
    };

    fetchCards();
  }, []);

  return [cards, isLoading, error];
};
