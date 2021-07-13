import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ChartsModule } from 'ng2-charts';
import { InvoiceWebappSharedModule } from 'app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AddRoomComponent } from 'app/modules/system-categories/room/add-room/add-room.component';
import { RoomResourcesRoutingModule } from 'app/modules/system-categories/room/room-resources-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PerfectScrollbarModule, InvoiceWebappSharedModule, ChartsModule, TreeViewModule, RoomResourcesRoutingModule],
  entryComponents: [AddRoomComponent]
})
export class RoomResourcesModule {}
