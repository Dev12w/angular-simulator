import { Component } from '@angular/core';
import { Color } from '.././enums/Color';
import './collection';
import './training';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  lAST_VISIT_DATE_KEY = 'lastVisitDate';
  VISIT_COUNTER_KEY = 'visitCounter';
  
  companyName: string = 'Румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCounter();
  }

  saveLastVisitDate(): void {
    const date: Date = new Date();
    localStorage.setItem(this.lAST_VISIT_DATE_KEY, date.toISOString());
  }

  incrementVisitCounter(): void {
    const visitCounter: number = Number(localStorage.getItem(this.VISIT_COUNTER_KEY)) || 0;
    localStorage.setItem(this.VISIT_COUNTER_KEY, `${visitCounter + 1}`);
  }

  isMainColor(color: Color): boolean {
    return [Color.BLUE, Color.GREEN, Color.RED].includes(color);
  }

}