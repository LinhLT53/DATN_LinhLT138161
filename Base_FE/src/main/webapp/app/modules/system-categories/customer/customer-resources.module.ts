import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AddCustomerComponent } from 'app/modules/system-categories/customer/add-customer/add-customer.component';
import { CustomerResourcesRoutingModule } from 'app/modules/system-categories/customer/customer-resources-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, CustomerResourcesRoutingModule],
  entryComponents: [AddCustomerComponent]
})
export class CustomerResourcesModule {}
