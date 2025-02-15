import { Injectable } from '@angular/core';
import { Constant } from '../../config/constant.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(protected http: HttpClient) { }

  private readonly API = `${Constant.api}/users`;

  public getAll() {
    const params = new HttpParams()
    .set('limit', 10);

    return this.http
      .get<any>(`${this.API}`, {params})
      .pipe(take(1));
  }

  public create(contato: any) {
    return this.http
      .post(`${this.API}/add`, contato)
      .pipe(take(1));
  }

  public update(contato: any) {
    return this.http
      .put(`${this.API}/${contato.id}`, contato)
      .pipe(take(1));
  }

  public getById(id: number) {
    return this.http
      .get<any>(`${this.API}/${id}`)
      .pipe(take(1));
  }

  public getByName(name: string) {
    const params = new HttpParams()
    .set('limit', 10)
    .set('q', name);

    return this.http
      .get<any>(`${this.API}`, { params: params })
      .pipe(take(1));
  }

  public deleteById(id: number) {
    return this.http
      .delete<any>(`${this.API}/${id}`)
      .pipe(take(1));
  }
}
