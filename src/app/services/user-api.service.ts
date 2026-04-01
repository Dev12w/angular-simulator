import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IApiUser } from '../interfaces/IApiUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private usersApi = "https://jsonplaceholder.typicode.com/users";
  private http = inject(HttpClient);
  
  getUsers(): Observable<IApiUser[]> {
    return this.http.get<IApiUser[]>(this.usersApi);
  }

}