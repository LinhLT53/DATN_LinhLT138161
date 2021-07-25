import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ServiceResourcesRoutingModule } from 'app/modules/system-categories/service/service-resources-routing.module';
import { AddtourComponent } from 'app/modules/system-categories/tour/addtour/addtour.component';

@NgModule({
  declarations: [AddtourComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, ServiceResourcesRoutingModule],
  entryComponents: [AddtourComponent]
})
export class tourResourcesModule {}
