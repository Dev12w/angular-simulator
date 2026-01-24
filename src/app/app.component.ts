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

  lastVisitDateKey = 'lastVisitDate';
  visitCounterKey = 'visitCounter';

  constructor() {
    this.saveLastVisitDate();
    this.incrementVisitCounter();
  }

  companyName: string = 'Румтибет';

  saveLastVisitDate() {
    const date = new Date();
    localStorage.setItem(this.lastVisitDateKey, date.toISOString());
  }

  incrementVisitCounter() {
    const visitCounter = Number(localStorage.getItem(this.visitCounterKey)) || 0;
    localStorage.setItem(this.visitCounterKey, `${visitCounter + 1}`);
  }

  isMainColor(color: Color): boolean {
    return (color === Color.BLUE || color === Color.GREEN || color === Color.RED);
  }

}