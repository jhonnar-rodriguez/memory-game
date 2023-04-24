import { Card } from '../../src/types';

export const defaultCards: Card[] = [
  {
    id: 1,
    image: '/image-a.png',
    isRevealed: false,
    name: 'Image A',
  },
  {
    id: 2,
    image: '/image-b.png',
    isRevealed: false,
    name: 'Image B',
  },
  {
    id: 3,
    image: '/image-c.png',
    isRevealed: false,
    name: 'Image C',
  },
];

export const cardsToTestHits: Card[] = [
  {
    id: 1,
    image: '/image-a.png',
    isRevealed: false,
    name: 'image-a',
  },
  {
    id: 2,
    image: '/image-b.png',
    isRevealed: false,
    name: 'image-b',
  },
];

export const cardsToTestGameIsCompleted: Card[] = [
  {
    id: 1,
    image: '/image-a.png',
    isRevealed: false,
    name: 'image-a',
  },
];
