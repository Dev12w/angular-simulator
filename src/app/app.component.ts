import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { CommonModule, DatePipe } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MessageComponent } from '../components/message/message.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../components/loader/loader.component';
import { ParentComponent } from '../homework-28/parent/parent.component';
import { ChangeDetectionComponent } from '../homework-28/change-detection/change-detection.component';
import { ChangeDetectionOnpushComponent } from '../homework-28/change-detection-onpush/change-detection-onpush.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, MessageComponent, RouterOutlet, LoaderComponent, ParentComponent, ChangeDetectionComponent, ChangeDetectionOnpushComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly LAST_VISIT_DATE_KEY: string = 'last-visit-date';
  readonly VISIT_COUNTER_KEY: string = 'visit-counter';

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private datePipe: DatePipe = inject(DatePipe);

  isLoading: boolean = true;

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCounter();
    this.completeCollection();
    this.simulateLoading();
  }

  simulateLoading(): void {
    setTimeout(() => (this.isLoading = false), 1000);
  }

  completeCollection(): void {
    const phoneBrands: Collection<string> = new Collection<string>(['Apple', 'Samsung', 'Honor', 'Xiaomi']);

    phoneBrands.getItem(0);
    phoneBrands.replace(2, 'Honor Replaced');
    phoneBrands.removeByIndex(1);
    phoneBrands.clear();
  }

  saveLastVisitDate(): void {
    const formattedDate: string | null = this.datePipe.transform(new Date());
    this.localStorageService.setItem<string | null>(this.LAST_VISIT_DATE_KEY, formattedDate);
  }

  saveVisitCounter(): void {
    const visitCounter: number = Number(this.localStorageService.getItem<string>(this.VISIT_COUNTER_KEY) || 0);
    this.localStorageService.setItem<string>(this.VISIT_COUNTER_KEY, `${ visitCounter + 1 }`);
  }

  isMainColor(color: Color): boolean {
    return [Color.BLUE, Color.GREEN, Color.RED].includes(color);
  }

}
