import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'change-detection-onpush',
  standalone: true,
  templateUrl: './change-detection-onpush.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionOnpushComponent implements DoCheck {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private http: HttpClient = inject(HttpClient);
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
      this.cdr.detach()
      this.cdr.reattach();
      this.cdr.detectChanges();
    }, 1000);
  }

  ChangeDetectionThree(): void {
    Promise.resolve().then(() => {
      this.count++;
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
    });
  }

  ChangeDetectionFour(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        tap(() => this.count++),
        tap(() => this.cdr.detach()),
        tap(() => this.cdr.reattach()),
        tap(() => this.cdr.detectChanges()),
      )
      .subscribe();
  }

  ChangeDetectionFive(): void {
    const intervalId: number = setInterval(() => {
      this.count++;
      if (this.count >= 5) {
        clearInterval(intervalId);
      }
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
    }, 1000);
  }

  ChangeDetectionSix(): void {
    this.count++;

    setTimeout(() => {
      this.count++;
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
    }, 0);

    Promise.resolve().then(() => {
      this.count++;
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
    });
  }
}
