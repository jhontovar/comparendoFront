import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroTransferenciaComponent } from './registro-transferencia/registro-transferencia.component';

const routes: Routes = [  {
  path: 'trasferencias',
  component: RegistroTransferenciaComponent,
  data: { title: 'Realizar Transferencias' },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
