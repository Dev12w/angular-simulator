import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private usersUrl: string = "https://jsonplaceholder.typicode.com/users";
  private http: HttpClient = inject(HttpClient);
  
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

}