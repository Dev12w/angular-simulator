import type { IOffer } from './interfaces/IOffer';
import { faBuilding, faShieldHalved, faUsers } from '@fortawesome/free-solid-svg-icons';

export const offers: IOffer[] = [
  {
    id: 1,
    icon: faUsers,
    title: 'Опытный гид',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
  },
  {
    id: 2,
    icon: faShieldHalved,
    title: 'Безопасный поход',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
  },
  {
    id: 3,
    icon: faBuilding,
    title: 'Лояльные цены',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
  },
];
