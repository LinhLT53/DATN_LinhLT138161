import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AssetResourcesRoutingModule } from 'app/modules/system-categories/asset-resuorce/asset-resources-routing.module';
import { BookRoomComponent } from './book-room.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { PayComponent } from './pay/pay.component';
import { PrintPayComponent } from './print-pay/print-pay.component';
import { NgxPrintModule } from 'ngx-print';
// import { AddAssetComponent } from './add-asset/add-asset.component';

@NgModule({
  declarations: [
    AddServiceComponent,
    BookRoomComponent,
    AddBookingComponent,
    AddServiceComponent,
    AddBookingComponent,
    PayComponent,
    PrintPayComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    InvoiceWebappSharedModule,
    ChartsModule,
    NgxPrintModule,
    TreeViewModule,
    AssetResourcesRoutingModule
  ],
  entryComponents: [AddServiceComponent, AddBookingComponent, PayComponent, PrintPayComponent]
})
export class BookRoomModule {}
