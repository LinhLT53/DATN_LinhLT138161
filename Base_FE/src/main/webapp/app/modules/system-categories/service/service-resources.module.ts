import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceResourcesRoutingModule } from 'app/modules/system-categories/service/service-resources-routing.module';

@NgModule({
  declarations: [AddServiceComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, ServiceResourcesRoutingModule],
  entryComponents: [AddServiceComponent]
})
export class ServiceResourcesModule {}
