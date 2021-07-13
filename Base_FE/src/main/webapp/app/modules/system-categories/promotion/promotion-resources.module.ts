import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { PromotionResourcesRoutingModule } from 'app/modules/system-categories/promotion/promotion-resources-routing.module';

@NgModule({
  declarations: [AddPromotionComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, PromotionResourcesRoutingModule],
  entryComponents: [AddPromotionComponent]
})
export class PromotionResourcesModule {}
