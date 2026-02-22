import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { offers } from './offers';
import { IOffer } from './interfaces/IOffer';
import { galleryImages } from './gallery-images';
import { IPicture } from './interfaces/IPicture';
import { ICard } from './interfaces/ICard';
import { popularCards } from './popular-cards';
import { travelCards } from './travel-cards';
import { MessageService } from './services/message.service';
import { Message } from '../enums/Message';
import { LocalStorageService } from './services/local-storage.service';
import { Widget } from '../types/Widget';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  offers: IOffer[] = offers;
  gallery: IPicture[] = galleryImages;
  populars: ICard[] = popularCards;
  travels: ICard[] = travelCards;

  readonly LAST_VISIT_DATE_KEY: string = 'last-visit-date';
  readonly VISIT_COUNTER_KEY: string = 'visit-counter';

  messageType: typeof Message = Message;

  companyName: string = 'Румтибет';
  city: string = '';
  date: string = '';
  participants: string = '';
  count: number = 0;
  currentDate: Date = new Date();
  currentHeaderWidget: Widget = 'date';
  liveInputValue!: string;
  isLoading: boolean = true;

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCounter();
    this.completeCollection();
    this.initCurrentDate();
    this.simulateLoading();
  }

  simulateLoading(): void {
    setTimeout(() => this.isLoading = false, 1000);
  }

  setHeaderWidget(widget: Widget): void {
    this.currentHeaderWidget = widget;
  }

  private initCurrentDate(): void {
    setInterval(() => this.currentDate = new Date(), 1000);
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

  completeCollection(): void {
    const phoneBrands: Collection<string> = new Collection<string>(['Apple', 'Samsung', 'Honor', 'Xiaomi']);

    phoneBrands.getItem(0);
    phoneBrands.replace(2, 'Honor Replaced');
    phoneBrands.removeByIndex(1);
    phoneBrands.clear();
  }

  saveLastVisitDate(): void {
    const date: Date = new Date();
    this.localStorageService.setItem<string>(this.LAST_VISIT_DATE_KEY, date.toISOString());
  }

  saveVisitCounter(): void {
    const visitCounter: number = Number(this.localStorageService.getItem<string>(this.VISIT_COUNTER_KEY) || 0);
    this.localStorageService.setItem<string>(this.VISIT_COUNTER_KEY, `${ visitCounter + 1 }`);
  }

  isMainColor(color: Color): boolean {
    return [Color.BLUE, Color.GREEN, Color.RED].includes(color);
  }

}
