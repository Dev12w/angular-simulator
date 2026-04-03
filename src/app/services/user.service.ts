import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getValue(): IUser[] {
    return this.usersSubject.value;
  }

  loadUsers(): void {
    this.loaderService.showLoader();
    this.userApiService.getUsers().pipe(
      tap((users: IUser[]) => this.setUsers(users)),
      finalize(() => this.loaderService.hideLoader()),
      catchError(() => {
        this.messageService.showError('Нет пользователей для отображения');
        return of([]);
      })
    ).subscribe();
  }

}
