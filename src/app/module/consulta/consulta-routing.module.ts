import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrmComparendoComponent } from './frm-comparendo/frm-comparendo.component';
import { FrmRecaudoTransferenciaComponent } from './frm-recaudo-transferencia/frm-recaudo-transferencia.component';

const routes: Routes = [
  {
    path: 'comparendo',
    component: FrmComparendoComponent,
    data: { title: 'Consultar Comparendos' },
  },
  {
    path: 'recaudo',
    component: FrmRecaudoTransferenciaComponent,
    data: { title: 'Consultar Recaudo y Transferencia' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
