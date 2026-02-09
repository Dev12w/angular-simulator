export interface IOffer {
  id: number;
  icon: string;
  alt: string;
  title: string;
  text: string;
  extraClass: string;
}

export const OFFERS: IOffer[] = [
  {
    id: 1,
    icon: 'images/guide-icon.png',
    alt: 'guide-icon',
    title: 'Опытный гид',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    extraClass: ''
  },
  {
    id: 2,
    icon: 'images/security-icon.png',
    alt: 'security-icon',
    title: 'Безопасный поход',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    extraClass: 'security-icon'
  },
  {
    id: 3,
    icon: 'images/price-icon.png',
    alt: 'price-icon',
    title: 'Лояльные цены',
    text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    extraClass: 'price-icon'
  }
];
