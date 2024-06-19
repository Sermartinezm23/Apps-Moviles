import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DondeComprarPage } from './donde-comprar.page';

const routes: Routes = [
  {
    path: '',
    component: DondeComprarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DondeComprarPageRoutingModule {}
