import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ServiceResourcesRoutingModule } from 'app/modules/system-categories/service/service-resources-routing.module';
import { AdddutyComponent } from 'app/modules/system-categories/service-duty/addduty/addduty.component';

@NgModule({
  declarations: [AdddutyComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, ServiceResourcesRoutingModule],
  entryComponents: [AdddutyComponent]
})
export class dutyResourcesModule {}
