import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../types/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpLoggingInterceptor } from './interceptor/http-logging.interceptor';
import { serverErrorInterceptor } from './interceptor/server-error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '../features/auth/interceptor/auth.interceptor';
import { AuthService } from '../features/auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

function getCurrentThemePreset(): Preset {
  const themeName: string = localStorage.getItem('theme') ?? '';

  return (
    {
      [Theme.AURA]: Aura,
      [Theme.LARA]: Lara,
      [Theme.NORA]: Nora,
    }[themeName] ?? Aura
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return firstValueFrom(authService.initAuthToken());
    }),
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(
      withInterceptors([authInterceptor, httpLoggingInterceptor, serverErrorInterceptor]),
    ),
    providePrimeNG({
      theme: {
        preset: getCurrentThemePreset(),
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};
