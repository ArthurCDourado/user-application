import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './guards/auth.guard';
import { ContatoService } from './services/http/contato.service';
import { AuthService } from './services/http/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './interceptors/interceptor-http.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({ declarations: [],
    exports: [NgxMaskDirective, NgxMaskPipe], imports: [NgxMaskDirective, NgxMaskPipe,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        CommonModule], providers: [provideNgxMask(), StorageService, AuthGuard, ContatoService, AuthService, HttpInterceptorService, provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule { }
