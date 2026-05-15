import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface ICard {
  id: string;
  image: string;
  price?: number;
  rating?: number;
  icon?: IconDefinition;
  date?: string;
  link?: string;
  title: string;
  description: string;
}
