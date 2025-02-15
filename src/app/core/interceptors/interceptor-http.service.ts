import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Constant } from "../config/constant.config";
import { StorageService } from "../services/storage.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private storage: StorageService, private router: Router) { }

  buildHeader(request: HttpRequest<any>): object {
    const authToken = `Bearer ${this.storage.token}`

    return {
      setHeaders: {
        ...!(request.headers.has('Authorization')) && {'Authorization': this.storage.isAuthenticated() ? authToken : ''},
        ...!(request.body instanceof FormData) && {'Content-Type': 'application/json;charset=utf-8'}
      }
    };
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isApi = request.url.includes(Constant.api);
    const reqModified = request.clone(this.buildHeader(request));

    return next.handle(isApi ? reqModified : request)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              // case HTTPStatus.INTERNAL_SERVER_ERROR:
              //   console.log('Erro interno no servidor!');
              // break;

              // case HTTPStatus.UNAUTHORIZED:
              //   this.storage.clear();
              //   console.log('Você não possui permissão para essa funcionalidade!');
              // break;

              // case HTTPStatus.BAD_REQUEST:
              //   console.log('Um erro ocorreu. Por favor contate nosso suporte.');
              // break;

              default:
                break;
            }
          }

          return throwError(() => error);
          }
        )
      )
  }
}
