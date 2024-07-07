import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendacionesPageRoutingModule } from './recomendaciones-routing.module';

import { RecomendacionesPage } from './recomendaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendacionesPageRoutingModule
  ],
  declarations: [RecomendacionesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecomendacionesPageModule {}
