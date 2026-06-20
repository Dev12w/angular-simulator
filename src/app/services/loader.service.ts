import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { RouterEvent } from '../../features/posts/type/RouterEvent';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private router: Router = inject(Router);

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {
    this.initLoader();
  }

  showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }

  private initLoader(): void {
    this.router.events.pipe(
      filter((event: Event) =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ),
      tap((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.showLoader();
        } else {
          this.hideLoader();
        }
      })
    ).subscribe();
  }

}
