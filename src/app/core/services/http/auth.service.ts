import { Injectable } from '@angular/core';
import { Constant } from '../../config/constant.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = `${Constant.api}/Auth`;

  constructor(protected http: HttpClient) { }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('login', username)
      .set('senha', password);

    return this.http.get<any>(`${this.api}/Login`, {params}).pipe(take(1));
  }
}
