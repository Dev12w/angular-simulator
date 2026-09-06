import { ChangeDetectionStrategy, Component, DoCheck, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'change-detection',
  standalone: true,
  templateUrl: './change-detection.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionComponent implements DoCheck {

  private http: HttpClient = inject(HttpClient);
  private zone: NgZone = inject(NgZone);
  count: number = 0;

  ngDoCheck(): void {
    console.error('Change Detection');
  }

  ChangeDetectionOne(): void {
    this.count++;
  }

  ChangeDetectionTwo(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  ChangeDetectionThree(): void {
    Promise.resolve().then(() => {
      this.count++;
    });
  }

  ChangeDetectionFour(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(tap(() => this.count++))
      .subscribe();
  }

  ChangeDetectionFive(): void {
    const intervalId: number = setInterval(() => {
      this.count++;
      if (this.count >= 5) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  ChangeDetectionSix(): void {
    this.count++;

    setTimeout(() => {
      this.count++;
    }, 0);

    Promise.resolve().then(() => {
      this.count++;
    });
  }

}
