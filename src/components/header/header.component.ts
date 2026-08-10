import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Widget } from '../../types/Widget';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../../app/services/theme.service';
import { INavigationLink } from '../../app/interfaces/INavigationLink';
import { ITheme } from '../../app/interfaces/ITheme';
import { APP_CONFIG } from '../../app/tokens/app-config.token';
import { IAppConfig } from '../../app/interfaces/IAppConfig';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    CommonModule,
    RouterLinkActive,
    RouterLink,
    SelectButton,
    ToggleSwitch,
    DatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  themeOptions: ITheme[] = this.themeService.themes;
  appConfig: IAppConfig = inject(APP_CONFIG);
  private authService: AuthService = inject(AuthService);

  count: number = 0;
  currentHeaderWidget: Widget = 'date';
  currentDate: Date = new Date();

  constructor() {
    this.initCurrentDate();
  }

  navigationLink: INavigationLink[] = [
    {
      name: 'Главная',
      path: '',
    },
    {
      name: 'Пользователи',
      path: 'users',
    },
    {
      name: 'Посты',
      path: 'posts',
    },
  ];

  setHeaderWidget(widget: Widget): void {
    this.currentHeaderWidget = widget;
  }

  incrementCount(): void {
    this.count = this.count + 1;
  }

  decrementCount(): void {
    this.count = this.count > 0 ? this.count - 1 : 0;
  }

  lastLoginDate(): string | null {
    return this.authService.getLastLogin();
  }

  private initCurrentDate(): void {
    setInterval(() => (this.currentDate = new Date()), 1000);
  }

}
