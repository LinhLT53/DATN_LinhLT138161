import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
import { RoomTypeResourcesRoutingModule } from 'app/modules/system-categories/room-type/room-type-resources-routing.module';

@NgModule({
  declarations: [AddRoomTypeComponent],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, RoomTypeResourcesRoutingModule],
  entryComponents: [AddRoomTypeComponent]
})
export class RoomTypeResourcesModule {}
