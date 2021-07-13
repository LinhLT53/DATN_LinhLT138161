import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FormStoringService} from "app/shared/services/form-storing.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private storageService: FormStoringService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'Authorization';
    const token = this.storageService.getToken();
    if (token !== null && !request.headers.has(headerName)) {
      request = request.clone({ headers: request.headers.set(headerName,'Bearer '+ token) });
    }

    return next.handle(request);
  }
}
