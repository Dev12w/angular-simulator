import { Component } from '@angular/core';
import { Color } from '.././enums/Color';
import { Collection } from './collection';
import './training';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  LAST_VISIT_DATE_KEY: string = 'lastVisitDate';
  VISIT_COUNTER_KEY: string = 'visitCounter';

  companyName: string = 'Румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.saveCounterVisit();
    this.completeCollection();
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
    localStorage.setItem(this.LAST_VISIT_DATE_KEY, date.toISOString());
  }

  saveCounterVisit(): void {
    const visitCounter: number = Number(localStorage.getItem(this.VISIT_COUNTER_KEY)) || 0;
    localStorage.setItem(this.VISIT_COUNTER_KEY, `${ visitCounter + 1 }`);
  }

  isMainColor(color: Color): boolean {
    return [Color.BLUE, Color.GREEN, Color.RED].includes(color);
  }

}
