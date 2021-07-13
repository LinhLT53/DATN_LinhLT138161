import {Injectable} from '@angular/core';
import {JhiEventManager} from 'ng-jhipster';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private eventManager: JhiEventManager,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
        },
        (err: any) => {

          // console.warn("Loi cmnr");

          if (err instanceof HttpErrorResponse) {
            if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('api/account'))))) {
              this.eventManager.broadcast({name: 'invoiceWebappApp.httpError', content: err});
            }
            if (err.status === 401 || err.status === 403) {
              this.router.navigate(['/login']);
            }
          }
        }
      )
    );
  }
}
