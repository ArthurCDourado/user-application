import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Constant } from "../config/constant.config";
import { StorageService } from "../services/storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private storage: StorageService) { }

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
              //   this.routeService.go([Constant.routes['500']]);
              //   break;

              // case HTTPStatus.FORBIDDEN:
              //   this.wStorage.clear();
              //   this.routeService.go([Constant.routes.login]);
              //   setTimeout(() => {
              //     this._alert.warning('Você não possui permissão para executar esta ação.');
              //   });
              //   break;

              // case HTTPStatus.UNAUTHORIZED:
              //   this.wStorage.clear();
              //   this.routeService.go([Constant.routes.login]);
              //   setTimeout(() => {
              //     this._alert.warning('Sua sessão expirou, por favor, autentique-se novamente.');
              //   });
              //   break;

              // case HTTPStatus.BAD_REQUEST:
              //   setTimeout(() => {
              //     this._alert.danger('Um erro ocorreu. Por favor contate nosso suporte.', `${error?.error?.message}`);
              //   });
              //   break;

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
