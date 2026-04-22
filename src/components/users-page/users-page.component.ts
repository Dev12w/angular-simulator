import { Component, inject } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { IUser } from '../../app/interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);

  filterText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([this.userService.users$, this.filterText$]).pipe(
    map(([users, filterText]) => {
      filterText = filterText.trim().toLowerCase();
      const filteredUsers: IUser[] = users.filter((user: IUser) => user.name.toLowerCase().includes(filterText));
      return filteredUsers;
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

  handleDeleteUser(user: IUser): void {
    const filteredUsers: IUser[] = this.userService.getUsers().filter((userItem: IUser) => userItem.id != user.id);
    this.userService.setUsers(filteredUsers);
  }

  handleCreateUser(user: IUser): void {
    this.userService.setUsers([user, ...this.userService.getUsers()]);
  }

}
