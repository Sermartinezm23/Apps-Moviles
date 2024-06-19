import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'mis-recetas',
        loadChildren: () => import('../mis-recetas/mis-recetas.module').then(m => m.MisRecetasPageModule)
      },
      {
        path: 'crear-receta',
        loadChildren: () => import('../crear-receta/crear-receta.module').then(m => m.CrearRecetaPageModule)
      },
      {
        path: 'recomendaciones',
        loadChildren: () => import('../recomendaciones/recomendaciones.module').then(m => m.RecomendacionesPageModule)
      },
      {
        path: 'donde-comprar',
        loadChildren: () => import('../donde-comprar/donde-comprar.module').then(m => m.DondeComprarPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/mis-recetas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/mis-recetas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
