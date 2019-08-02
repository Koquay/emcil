import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../shared/models/data-model';
import { MessageService } from '../shared/message/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/user/';
  private isLoggedIn = false;

  constructor(
    private httpClient:HttpClient,
    private messageService:MessageService
  ) { }

  public login(user:User) {
    console.log('user', user)
    return this.httpClient.post<User>(this.userUrl, {user:user})
    .pipe(
      map(user => {
        console.log('user', user)
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedIn = true;
      }),
      catchError(error => {
        console.log('error', error)
        this.messageService.sendErrorMessage(error);
        throw error;
      })
    )
  }
}
