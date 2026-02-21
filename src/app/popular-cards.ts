import { ICard } from './interfaces/ICard';

export const popularCards: ICard[] = [
  {
    id: 'lake-near-mountains',
    image: 'lake-near-mountains',
    title: 'Озеро возле гор',
    rating: 4.9,
    icon: 'rating-star-icon',
    price: 480,
    description: 'романтическое приключение'
  },
  {
    id: 'night-mountains',
    image: 'night-mountains',
    title: 'Ночь в горах',
    rating: 4.5,
    icon: 'rating-star-icon',
    price: 500,
    description: 'в компании друзей'
  },
  {
    id: 'yoga-in-mountains',
    image: 'yoga-in-mountains',
    title: 'Йога в горах',
    rating: 5.1,
    icon: 'rating-star-icon',
    price: 230,
    description: 'для тех, кто забоится о себе'
  }
];
