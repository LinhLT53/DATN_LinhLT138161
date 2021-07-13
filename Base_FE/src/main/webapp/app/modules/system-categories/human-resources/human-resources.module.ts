import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHumanResourcesComponent } from './add-human-resources/add-human-resources.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HumanResourcesRoutingModule } from 'app/modules/system-categories/human-resources/human-resources-routing.module';
import { HumanResourcesComponent } from 'app/modules/system-categories/human-resources/human-resources.component';

@NgModule({
  declarations: [AddHumanResourcesComponent, HumanResourcesComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, HumanResourcesRoutingModule],
  entryComponents: [AddHumanResourcesComponent]
})
export class HumanResourcesModule {}
