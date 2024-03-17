import { Injectable } from '@angular/core';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(private storage: SessionStorageService) { }

  @SessionStorage('tk')
  private _token: string = '';

  set token(token: string) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }

  clear() {
    this.storage.clear();
  }

  isAuthenticated() {
    return !!this._token;
  }
}
