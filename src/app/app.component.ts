import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'User App';

  year: number = new Date().getFullYear();

  constructor(private storage: StorageService) {}

  resetStorage() {
    this.storage.clear();
    window.location.reload();
  }
}
