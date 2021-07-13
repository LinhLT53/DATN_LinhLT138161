import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HistoryResourcesRoutingModule } from 'app/modules/system-categories/history/history-resources-routing.module';

@NgModule({})
export class HistoryResourcesModule {}

class HistoryResourcesModuleImpl extends HistoryResourcesModule {}
