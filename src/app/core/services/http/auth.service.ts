import { Injectable } from '@angular/core';
import { Constant } from '../../config/constant.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = `${Constant.api}/auth`;

  constructor(protected http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, {username: username, password: password}).pipe(take(1));
  }
}
