import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { IApiUser } from '../interfaces/IApiUser';
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

  private usersSubject: BehaviorSubject<IApiUser[]> = new BehaviorSubject<IApiUser[]>([]);
  users$: Observable<IApiUser[]> = this.usersSubject.asObservable();

  setUsers(users: IApiUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IApiUser[] {
    return this.usersSubject.value;
  }

  loadUsers(): Observable<IApiUser[]> {
    this.loaderService.showLoader();

    return  this.userApiService.getUsers().pipe(
      finalize(() => this.loaderService.hideLoader()),
      catchError(() => {
        this.messageService.showError('Нет пользователей для отображения');
        return of([]);
      })
    );
  }

}
