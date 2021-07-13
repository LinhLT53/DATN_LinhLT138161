import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoiceWebapMainRoutingModule} from '../main/main-routing.module';
import {JhiLanguageService} from 'ng-jhipster';
import {InvoiceWebappSharedModule} from "app/shared/shared.module";
 import {ChangePasswordComponent} from "app/layouts/navbar/change-password/change-password.component";
import {WebsocketService} from "app/core/services/websocket/websocket.service";
@NgModule({
  imports: [CommonModule, InvoiceWebappSharedModule, InvoiceWebapMainRoutingModule],
  declarations: [],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService },WebsocketService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ChangePasswordComponent]
})
export class InvoiceWebappMainModule {
}
