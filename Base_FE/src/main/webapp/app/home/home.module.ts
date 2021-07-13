import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {InvoiceWebappSharedModule} from 'app/shared/shared.module';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';
import {SystemCategoriesModule} from "app/modules/system-categories/system-categories.module";

@NgModule({
  imports: [InvoiceWebappSharedModule, RouterModule.forChild([HOME_ROUTE]), SystemCategoriesModule],
  declarations: [HomeComponent]
})
export class InvoiceWebappHomeModule {
  constructor(router: RouterModule) {
  }

}
