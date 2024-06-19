import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DondeComprarPageRoutingModule } from './donde-comprar-routing.module';

import { DondeComprarPage } from './donde-comprar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DondeComprarPageRoutingModule
  ],
  declarations: [DondeComprarPage]
})
export class DondeComprarPageModule {}
