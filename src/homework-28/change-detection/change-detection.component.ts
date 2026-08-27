import { ChangeDetectionStrategy, Component, DoCheck, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-change-detection',
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

//   1.Обновился ли интерфейс автоматически?
//    ( Да, во всех сценариях )
//
//   2.Сколько раз выполнился ngDoCheck()?
//   (
//     1-й сценарий один раз при клике.
//     2-й сценарий два раза, при клике и после setTimeout.
//     3-й сценарий один раз, из-за объединения синхронного события клика и микрозадачи Promise.
//     4-й сценарий три раза, при клике, при http запросе и получения ответа от сервира.
//     5-й сценарий один при клике, и после по 1 на каждый запуск setInterval.
//     6-й сценарий два раза, при клике обединяться в оду синхронную операцию Click и Promise, после выполнится setTimeout.
//   )
//
//   3.Понадобилось ли использовать ChangeDetectorRef?
//    ( Нет )
//
//   4.Что именно, по вашему мнению, стало причиной запуска Change Detection?
//
//   Причиной запуска Change Detection является библиотека Zone.js. Она перехватывает асинхронные события (события DOM, таймеры, Promise, HTTP-запросы)
//   и дает сигнал Angular о завершении асинхронной задачи, после чего Angular запускает проверку компонента
//
