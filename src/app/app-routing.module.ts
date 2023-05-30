import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Consultas' },
    children: [
      {
        path: 'consulta',
        data: { title: 'Consultas' },
        loadChildren: () => import('./module/consulta/consulta.module').then(m => m.ConsultaModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
