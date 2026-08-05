import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Widget } from '../../types/Widget';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../../app/services/theme.service';
import { INavigationLink } from '../../app/interfaces/INavigationLink';
import { ITheme } from '../../app/interfaces/ITheme';
import { DATE_FORMAT} from '../../app/tokens/date-format.token';
import { AppConfig } from '../../app/interfaces/AppConfig';
import { APP_CONFIG } from '../../app/tokens/app-config.token';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLinkActive, RouterLink, SelectButton, ToggleSwitch],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  themeService: ThemeService = inject(ThemeService);
  dateFormat: string = inject(DATE_FORMAT);
  appConfig: AppConfig = inject(APP_CONFIG);

  themeOptions: ITheme[] = this.themeService.themes;

  companyName: string = this.appConfig.companyName;

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

  private initCurrentDate(): void {
    setInterval(() => (this.currentDate = new Date()), 1000);
  }
}
