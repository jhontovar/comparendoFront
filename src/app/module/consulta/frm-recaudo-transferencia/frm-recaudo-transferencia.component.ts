import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frm-recaudo-transferencia',
  templateUrl: './frm-recaudo-transferencia.component.html',
  styleUrls: ['./frm-recaudo-transferencia.component.scss']
})
export class FrmRecaudoTransferenciaComponent implements OnInit {

  public rTipoConsulta : string = '1';
  constructor() { }

  ngOnInit(): void {
  }


}
