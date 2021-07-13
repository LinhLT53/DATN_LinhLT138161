import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartResourcesRoutingModule } from 'app/modules/system-categories/chart/chart-resources-routing.module';
import { ChartComponentComponent } from './chart-component/chart-component.component';
import { GoogleChartsModule, ScriptLoaderService } from 'angular-google-charts';

@NgModule({
  declarations: [ChartComponentComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    InvoiceWebappSharedModule,
    TreeViewModule,
    ChartResourcesRoutingModule,
    ChartsModule,
    GoogleChartsModule
  ],
  entryComponents: [],
  providers: [ScriptLoaderService]
})
export class ChartResourcesModule {}
