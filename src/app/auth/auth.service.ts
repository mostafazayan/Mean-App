import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  createUser(email: string, password: string): any {
    const userData: User = { email: email, password: password };
    this.http
      .post(`${environment.baseUrl}user/signup`, userData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  userLogin(email: string, password: string): any {
    const userData: User = { email: email, password: password };
    this.http
      .post(`${environment.baseUrl}user/login`, userData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
