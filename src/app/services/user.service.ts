import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
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

  private USERS_KEY: string = 'users';

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem(this.USERS_KEY, users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  deleteUser(user: IUser): void {
    const filteredUsers: IUser[] = this.getUsers().filter((userItem: IUser) => userItem.id != user.id);
    this.setUsers(filteredUsers);
  }

  createUser(user: IUser): void {
    this.setUsers([user, ...this.getUsers()]);
  }

  loadUsers(): Observable<IUser[]> {
    const usersFromLocalStorage: IUser[] | null = this.localStorageService.getItem<IUser[]>(this.USERS_KEY);
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
