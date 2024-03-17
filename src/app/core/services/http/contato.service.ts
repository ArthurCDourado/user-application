import { Injectable } from '@angular/core';
import { Constant } from '../../config/constant.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(protected http: HttpClient) { }

  private readonly API = `${Constant.api}/Contatos`;

  public getAll() {
    return this.http
      .get<any>(`${this.API}/GetContatos`)
      .pipe(take(1));
  }

  public create(contato: any) {
    return this.http
      .post(`${this.API}/CreateContato`, contato)
      .pipe(take(1));
  }

  public update(contato: any) {
    return this.http
      .put(`${this.API}/UpdateContato`, contato)
      .pipe(take(1));
  }

  public getById(id: number) {
    const params = new HttpParams()
      .set('id', id);

    return this.http
      .get<any>(`${this.API}/GetContatos`, {params})
      .pipe(take(1));
  }

  public deleteById(id: number) {
    const params = new HttpParams()
      .set('id', id);

    return this.http
      .delete<any>(`${this.API}/DeleteContato`, {params})
      .pipe(take(1));
  }
}
