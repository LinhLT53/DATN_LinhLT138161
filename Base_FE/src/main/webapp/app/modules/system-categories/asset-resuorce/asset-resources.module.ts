import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AssetResourcesRoutingModule } from 'app/modules/system-categories/asset-resuorce/asset-resources-routing.module';
import { AddAssetComponent } from './add-asset/add-asset.component';

@NgModule({
  declarations: [AddAssetComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, AssetResourcesRoutingModule],
  entryComponents: [AddAssetComponent]
})
export class AssetResourcesModule {}
