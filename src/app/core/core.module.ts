import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './guards/auth.guard';
import { ContatoService } from './services/http/contato.service';
import { AuthService } from './services/http/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './interceptors/interceptor-http.service';


@NgModule({
  providers: [ StorageService, AuthGuard, ContatoService, AuthService, HttpInterceptorService ],
  declarations: [],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CoreModule { }
