import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {errorRoute} from './layouts/error/error.route';
import {navbarRoute} from './layouts/navbar/navbar.route';
import {DEBUG_INFO_ENABLED} from 'app/app.constants';
import {LoginComponent} from './account/login/login.component';
import {ChangePasswordComponent} from "app/layouts/navbar/change-password/change-password.component";
import {VerifyForgotPasswordComponent} from "app/account/login/forgot-password/verify-forgot-password/verify-forgot-password.component";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      title: 'Change Password Page'
    }
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'home',
          loadChildren: () => import('./home/home.module').then(m => m.InvoiceWebappHomeModule)
        },
        {
          path: 'login',
          component: LoginComponent,
          data: {
            title: 'Login Page'
          }
        },
        {
          path: 'forgot-password/:email/:key',
          component: VerifyForgotPasswordComponent,
          data: {
            title: 'Login Page'
          }
        },
        ...LAYOUT_ROUTES
      ],
      {useHash: true, enableTracing: DEBUG_INFO_ENABLED}
    )
  ],
  exports: [RouterModule]
})
export class InvoiceWebappAppRoutingModule {
}
