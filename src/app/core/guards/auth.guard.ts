import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {

    if (this.storage.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/account/login']);
    this.storage.clear();

    return true;
  }
}
