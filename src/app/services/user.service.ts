import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  private usersKey = 'users';

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem(this.usersKey, users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const usersFromLocalStorage: IUser[] | null = this.localStorageService.getItem<IUser[]>(this.usersKey);
    if (usersFromLocalStorage && usersFromLocalStorage.length > 0) {
      return of(usersFromLocalStorage);
    }

    this.loaderService.showLoader();
    return this.userApiService.getUsers()
      .pipe(
        finalize(() => this.loaderService.hideLoader()),
        catchError(() => {
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        })
      );
  }

}
