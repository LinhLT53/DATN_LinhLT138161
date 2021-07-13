import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JhiMainComponent } from 'app/layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: JhiMainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../home/home.module').then(m => m.InvoiceWebappHomeModule)
      },
      {
        path: 'system-categories',
        loadChildren: () => import('../../modules/system-categories/system-categories.module').then(m => m.SystemCategoriesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InvoiceWebapMainRoutingModule {}
