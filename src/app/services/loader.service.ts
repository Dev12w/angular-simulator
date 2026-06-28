import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { RouterEvent } from '../../features/posts/type/RouterEvent';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }

}
