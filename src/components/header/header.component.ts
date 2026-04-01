import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Widget } from "../../types/Widget";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { INavigationLink } from "../../app/interfaces/INavigationLink";

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

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
  }

  navigationLink: INavigationLink[] = [
  {
    name: 'Главная',
    path: ''
  },
  {
    name: 'Пользователи',
    path: 'users'
  }
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

  isFormValid(): boolean {
    return !!(this.city && this.date && this.participants);
  }

  private initCurrentDate(): void {
    setInterval(() => this.currentDate = new Date(), 1000);
  }

}
