import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../shared/models/data-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/user/';

  constructor(
    private httpClient:HttpClient
  ) { }

  public logIn(user:User) {
    console.log('user', user)
    return this.httpClient.post<User>(this.userUrl, {user:user})
    .pipe(
      tap(user => {
        console.log('user', user)
      })
    )
  }
}
