import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptors/interceptor-http.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [SweetAlert2Module.forRoot(),
        BrowserModule,
        AppRoutingModule,
        NgxWebstorageModule.forRoot({ prefix: 'contato-app' })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
