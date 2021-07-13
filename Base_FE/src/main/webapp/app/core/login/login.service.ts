import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { KeySearch } from 'app/core/models/system-categories/keysearch.model';
import { SERVER_API } from 'app/shared/constants/api-resource.constants';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUri = SERVER_API;
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider, private http: HttpClient) {}

  login(credentials) {
    const data = {
      email: credentials.email,
      password: credentials.password,
      //rememberMe: credentials.rememberMe
      recaptchare: credentials.recaptchare
    };
    //  return this.http.post(SERVER_API_URL + 'auth/login', data, {});
    return this.http.post(this.baseUri + '/authen/login', data, {});
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logoutDirectly() {
    this.accountService.authenticate(null);
  }

  logout() {
    if (this.accountService.isAuthenticated()) {
      this.authServerProvider.logout().subscribe(() => this.accountService.authenticate(null));
    } else {
      this.accountService.authenticate(null);
    }
  }
}
