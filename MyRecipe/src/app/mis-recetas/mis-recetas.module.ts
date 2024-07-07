import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisRecetasPageRoutingModule } from './mis-recetas-routing.module';

import { MisRecetasPage } from './mis-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisRecetasPageRoutingModule
  ],
  declarations: [MisRecetasPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisRecetasPageModule {}
