import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Represents the routes of the application.
 */
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./module/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'Consultas' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'consulta',
        data: { title: 'Consultas' },
        loadChildren: () =>
          import('./module/consulta/consulta.module').then(
            (m) => m.ConsultaModule
          ),
      },
      {
        path: 'registro',
        data: { title: 'Registros' },
        loadChildren: () =>
          import('./module/registro/registro.module').then(
            (m) => m.RegistroModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
