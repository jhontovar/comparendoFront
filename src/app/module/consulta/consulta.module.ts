import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { FrmComparendoComponent } from './frm-comparendo/frm-comparendo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FrmRecaudoTransferenciaComponent } from './frm-recaudo-transferencia/frm-recaudo-transferencia.component';
import { FrmCaducidadesComponent } from './frm-caducidades/frm-caducidades.component';

@NgModule({
  declarations: [
    FrmComparendoComponent,
    FrmRecaudoTransferenciaComponent,
    FrmCaducidadesComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule
  ]
})
export class ConsultaModule { }
