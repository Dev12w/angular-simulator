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

  LAST_VISIT_DATE_KEY = 'lastVisitDate';
  VISIT_COUNTER_KEY = 'visitCounter';

  companyName: string = 'Румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCounter();
    this.testCollection();
  }

  testCollection() {
    interface IProduct {
      id: number;
      name: string;
    }

    const productCollection: Collection<IProduct> = new Collection<IProduct>([
      {
        id: 1,
        name: 'Apple'
      },
      {
        id: 2,
        name: 'Samsung'
      },
      {
        id: 3,
        name: 'Honor'
      },
      {
        id: 4,
        name: 'Xiaomi'
      },
    ]);

    productCollection.getItem(0);
    productCollection.replace(2, { id: 5, name: 'Huawey' });
    productCollection.removeByIndex(1);
    productCollection.clear();

    const col1 = new Collection<string>(['Apple', 'Samsung', 'Honor', 'Xiaomi']);

    col1.getItem(0);
    col1.replace(2, 'Honor Replaced');
    col1.removeByIndex(1);
    col1.clear();
  }

  saveLastVisitDate(): void {
    const date: Date = new Date();
    localStorage.setItem(this.LAST_VISIT_DATE_KEY, date.toISOString());
  }

  incrementVisitCounter(): void {
    const visitCounter: number = Number(localStorage.getItem(this.VISIT_COUNTER_KEY)) || 0;
    localStorage.setItem(this.VISIT_COUNTER_KEY, `${visitCounter + 1}`);
  }

  isMainColor(color: Color): boolean {
    return [Color.BLUE, Color.GREEN, Color.RED].includes(color);
  }

}
