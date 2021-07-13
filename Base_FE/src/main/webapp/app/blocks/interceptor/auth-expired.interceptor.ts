import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { STATUS_CODE } from 'app/shared/constants/status-code.constants';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === STATUS_CODE.AUTH) {
              const modalElemWindow = document.querySelector('ngb-modal-window');
              if (modalElemWindow && modalElemWindow.classList.contains('show')) {
                modalElemWindow.classList.remove('modal', 'fade', 'show', 'd-block');
              }
              const modalElemBackdrop = document.querySelector('ngb-modal-backdrop');
              if (modalElemBackdrop && modalElemBackdrop.classList.contains('show')) {
                modalElemBackdrop.classList.remove('modal-backdrop', 'fade', 'show');
              }
            }
          }
        }
      )
    );
  }
}
