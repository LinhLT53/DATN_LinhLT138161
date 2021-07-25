import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemCategoriesRoutingModule } from 'app/modules/system-categories/system-categories-routing.module';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { ConvertStatusPipe } from 'app/shared/pipes/convert-status.pipe';
import { MaxLengthTextPipe } from 'app/shared/pipes/max-length-text.pipe';
import { ImportExcelHumanResourceComponent } from 'app/modules/system-categories/human-resources/import-excel-human-resource/import-excel-human-resource.component';
import { HumanResourcesModule } from 'app/modules/system-categories/human-resources/human-resources.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { RoomTypeComponent } from './room-type/room-type.component';
import { ServiceComponent } from './service/service.component';
import { RoomComponent } from './room/room.component';
import { AssetResuorceComponent } from './asset-resuorce/asset-resuorce.component';
import { AssetResourcesModule } from 'app/modules/system-categories/asset-resuorce/asset-resources.module';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { RoomResourcesModule } from 'app/modules/system-categories/room/room-resources.module';
import { RoomTypeResourcesModule } from 'app/modules/system-categories/room-type/room-type-resources.module';
import { ServiceResourcesModule } from 'app/modules/system-categories/service/service-resources.module';
import { BookRoomModule } from './book-room/book-room.module';
import { CustomerComponent } from './customer/customer.component';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionResourcesModule } from 'app/modules/system-categories/promotion/promotion-resources.module';
import { AddBookingFutureComponent } from './add-booking-future/add-booking-future.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerResourcesModule } from 'app/modules/system-categories/customer/customer-resources.module';
import { ChartResourcesModule } from 'app/modules/system-categories/chart/chart-resources.module';
import { TourComponent } from './tour/tour.component';
import { AddtourComponent } from './tour/addtour/addtour.component';
import { tourResourcesModule } from 'app/modules/system-categories/tour/tour-resources.module';
@NgModule({
  declarations: [
    ImportExcelHumanResourceComponent,
    RoomTypeComponent,

    ServiceComponent,

    RoomComponent,

    AssetResuorceComponent,

    AddRoomComponent,

    CustomerComponent,

    PromotionComponent,

    AddBookingFutureComponent,
    PromotionComponent,
    AddCustomerComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    SystemCategoriesRoutingModule,
    PerfectScrollbarModule,
    InvoiceWebappSharedModule,
    ChartsModule,
    HumanResourcesModule,
    NgxQRCodeModule,
    AssetResourcesModule,
    RoomResourcesModule,
    RoomTypeResourcesModule,
    ServiceResourcesModule,
    BookRoomModule,
    PromotionResourcesModule,
    CustomerResourcesModule,
    ChartResourcesModule,
    tourResourcesModule
  ],
  entryComponents: [ImportExcelHumanResourceComponent],
  exports: [],
  providers: [ConvertStatusPipe, MaxLengthTextPipe, NgbActiveModal]
})
export class SystemCategoriesModule {}
