import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrmComparendoComponent } from './frm-comparendo/frm-comparendo.component';
import { FrmRecaudoTransferenciaComponent } from './frm-recaudo-transferencia/frm-recaudo-transferencia.component';
import { FrmCaducidadesComponent } from "./frm-caducidades/frm-caducidades.component";

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
  },
  {
    path: 'caducidades',
    component: FrmCaducidadesComponent,
    data: { title: 'Consultar Caducidades y Prescripciones' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
