import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Widget } from '../../types/Widget';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../../app/services/theme.service';
import { tap } from 'rxjs';
import { navigationLink } from '../../app/navigation-link';
import { INavigationLink } from '../../app/interfaces/INavigationLink';
import { themes } from '../../app/themes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITheme } from '../../app/interfaces/ITheme';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLinkActive, RouterLink, SelectButton, ToggleSwitch],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  destroyRef$: DestroyRef = inject(DestroyRef);

  navigationLink: INavigationLink[] = navigationLink;
  themeOptions: ITheme[] = themes;
  currentTheme: ITheme | null = null;
  isDarkMode: boolean = false;

  companyName: string = 'Румтибет';
  participants: string = '';
  liveInputValue!: string;
  city: string = '';
  date: string = '';
  count: number = 0;
  currentHeaderWidget: Widget = 'date';
  currentDate: Date = new Date();

  constructor() {
    this.initCurrentDate();

    this.themeService.theme$.pipe(
      tap((theme: ITheme) => this.currentTheme = theme),
      takeUntilDestroyed(this.destroyRef$),
    ).subscribe();

    this.themeService.isDarkMode$.pipe(
      tap((value: boolean) => this.isDarkMode = value),
      takeUntilDestroyed(this.destroyRef$),
    ).subscribe();
  }

  setHeaderWidget(widget: Widget): void {
    this.currentHeaderWidget = widget;
  }

  incrementCount(): void {
    this.count = this.count + 1;
  }

  decrementCount(): void {
    this.count = this.count > 0 ? this.count - 1 : 0;
  }

  isFormValid(): boolean {
    return !!(this.city && this.date && this.participants);
  }

  private initCurrentDate(): void {
    setInterval(() => this.currentDate = new Date(), 1000);
  }

}
