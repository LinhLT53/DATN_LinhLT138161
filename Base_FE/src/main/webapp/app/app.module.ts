import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import './vendor';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { InvoiceWebappCoreModule } from 'app/core/core.module';
import { InvoiceWebappAppRoutingModule } from './app-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { AppComponent } from 'app/app.component';
import { InvoiceWebappMainModule } from 'app/layouts/main/main.module';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './account/login/login.component';
import { ChangePasswordComponent } from 'app/layouts/navbar/change-password/change-password.component';
import { ForgotPasswordComponent } from './account/login/forgot-password/forgot-password.component';
import { VerifyForgotPasswordComponent } from './account/login/forgot-password/verify-forgot-password/verify-forgot-password.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/camelcase
import { NgZorroAntdModule, NZ_I18N, vi_VN } from 'ng-zorro-antd';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import vn from '@angular/common/locales/vi';

registerLocaleData(vn);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InvoiceWebappSharedModule,
    InvoiceWebappCoreModule,
    InvoiceWebappMainModule,
    InvoiceWebappAppRoutingModule,
    ChartsModule,
    ScrollingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    AppComponent,
    JhiMainComponent,
    NavbarComponent,
    SidebarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    VerifyForgotPasswordComponent
  ],
  exports: [],
  entryComponents: [ChangePasswordComponent, ForgotPasswordComponent],
  bootstrap: [AppComponent],
  // eslint-disable-next-line @typescript-eslint/camelcase
  providers: [{ provide: NZ_I18N, useValue: vi_VN }, { provide: NZ_ICONS, useValue: icons }]
})
export class InvoiceWebappAppModule {}
