import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import { ITheme } from '../interfaces/ITheme';
import { defaultTheme, themes } from '../themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private THEME_KEY: string = 'theme';
  private THEME_MODE_KEY: string = 'theme-dark-mode';

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private themeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(defaultTheme);
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  theme$: Observable<ITheme> = this.themeSubject.asObservable();
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    const themeName: string = this.localStorageService.getItem<string>(this.THEME_KEY) ?? '';
    const isDarkMode: boolean = this.localStorageService.getItem<boolean>(this.THEME_MODE_KEY) ?? false;
    const theme: ITheme = themes.find((theme: ITheme) => theme.name === themeName) ?? defaultTheme;

    setTimeout(() => {
      this.setTheme(theme);
      this.setDarkMode(isDarkMode);
    }, 0);
  }

  setTheme(theme: ITheme): void {
    usePreset(theme.preset);
    this.themeSubject.next(theme);
    this.localStorageService.setItem(this.THEME_KEY, theme.name);
  }

  setDarkMode(isDarkMode: boolean): void {
    isDarkMode
      ? document.documentElement.classList.add('app-dark')
      : document.documentElement.classList.remove('app-dark');

    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setItem(this.THEME_MODE_KEY, isDarkMode);
  }

}
