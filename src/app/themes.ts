import { ITheme } from './interfaces/ITheme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

export const themes: ITheme[] = [
  {
    name: 'Aura',
    preset: Aura
  },
  {
    name: 'Lara',
    preset: Lara
  },
  {
    name: 'Nora',
    preset: Nora
  },
];

export const defaultTheme: ITheme = themes[0];
