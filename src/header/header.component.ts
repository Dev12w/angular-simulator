import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Widget } from "../types/Widget";
import { RouterLink, RouterLinkActive } from "@angular/router";

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  navigationItems: NavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' }
  ];

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
