import { Component, inject } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../../app/interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);

  filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([this.userService.users$, this.filterTextSubject]).pipe(
    map(([users, filterText]: [IUser[], string]) => {
      filterText = filterText.trim().toLowerCase();
      return users.filter((user: IUser) => user.name.toLowerCase().includes(filterText));
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

  handleDeleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }

  handleCreateUser(user: IUser): void {
    this.userService.createUser(user);
  }

}
