import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@primeuix/themes/types';
import { ITheme } from './interfaces/ITheme';
import { defaultTheme, themes } from './services/theme.service';

function getCurrentThemePreset(): Preset {
  const themeName: string = localStorage.getItem('theme') ?? '';
  const theme: ITheme = themes.find((theme: ITheme) => theme.name === themeName) ?? defaultTheme;
  return theme.preset;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getCurrentThemePreset(),
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
  ]
};
