import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = 'https://randomuser.me/api'

  constructor(private http: HttpClient) { }

  getAll(params: any) {
    return this.http.get<any>(`${this.API}`, { params }).pipe(take(1))
  }
}
