import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { HumanResourcesComponent } from 'app/modules/system-categories/human-resources/human-resources.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RoomComponent } from 'app/modules/system-categories/room/room.component';
import { RoomTypeComponent } from 'app/modules/system-categories/room-type/room-type.component';
import { ServiceComponent } from 'app/modules/system-categories/service/service.component';
import { AssetResuorceComponent } from 'app/modules/system-categories/asset-resuorce/asset-resuorce.component';
import { CustomerComponent } from 'app/modules/system-categories/customer/customer.component';
import { PromotionComponent } from 'app/modules/system-categories/promotion/promotion.component';
import { AddBookingFutureComponent } from 'app/modules/system-categories/add-booking-future/add-booking-future.component';
import { ChartComponentComponent } from './chart/chart-component/chart-component.component';
import { TourComponent } from 'app/modules/system-categories/tour/tour.component';
import { ServiceDutyComponent } from 'app/modules/system-categories/service-duty/service-duty.component';
// import { ChartComponent } from 'app/modules/system-categories/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: BookRoomComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/book-room'
    }
  },
  {
    path: 'human-resources',
    component: HumanResourcesComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/human-resources'
    }
  },
  {
    path: 'tour-resources',
    component: TourComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: '/system-categories/tour-resources'
    }
  },
  {
    path: 'duty-resources',
    component: ServiceDutyComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: '/system-categories/duty-resources'
    }
  },
  {
    path: 'book-room',
    component: BookRoomComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/book-room'
    }
  },
  {
    path: 'book-room-future',
    component: AddBookingFutureComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/book-room-future'
    }
  },
  {
    path: 'asset-resource',
    component: AssetResuorceComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/asset-resource'
    }
  },
  {
    path: 'customer-resources',
    component: CustomerComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/customer-resource'
    }
  },
  {
    path: 'chart-resources',
    component: ChartComponentComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/chart-resources'
    }
  },
  {
    path: 'promotion-resources',
    component: PromotionComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/promotion-resource'
    }
  },
  {
    path: 'room-resources',
    component: RoomComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/room-resources'
    }
  },
  {
    path: 'room-type-resources',
    component: RoomTypeComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/room-type-resources'
    }
  },
  {
    path: 'service-resources',
    component: ServiceComponent,
    canActivate: [],
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/service-resources'
    }
  },
  {
    path: 'human-management',
    loadChildren: () => import('./human-resources/human-resources.module').then(m => m.HumanResourcesModule),
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'organizationCategories.title',
      url: 'system-categories/human-resources'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemCategoriesRoutingModule {}
