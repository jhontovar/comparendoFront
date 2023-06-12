import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DITRA } from 'src/app/core/constant/ditra.constants';
import { CaducidadPrescripcionStateService } from 'src/app/domain/consulta/caducidad-prescripcion-state.service';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';

@Component({
  selector: 'app-frm-caducidades',
  templateUrl: './frm-caducidades.component.html',
  styleUrls: ['./frm-caducidades.component.scss']
})
export class FrmCaducidadesComponent implements OnInit {
  public fControl: FormGroup;
  public lSeccional$: Observable<any>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  public objToast: any = {};

  constructor(private fb: FormBuilder, private recaudoTransferenciaStateService: RecaudoTransferenciaStateService,
    private caducidadPrescripcionStateService : CaducidadPrescripcionStateService) {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.fControl = this.fb.group({
      txtseccional: [{ value: '', disabled: true }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      txtfechainicial: [formatDate(firstDay, 'yyyy-MM-dd', 'en'), [Validators.required]],
      txtfechafinal: [formatDate(date, 'yyyy-MM-dd', 'en'), [Validators.required]],
      txttipo: ["N", [Validators.required]],
      txtconsulta: ["C", [Validators.required]]
    });

    let model = { idSeccional: "0" }
    this.lSeccional$ = this.recaudoTransferenciaStateService.ConsltarSeccional(model);
  }

  ngOnInit(): void {
  }
  /**
   * Consultar secretaria
   * @param event 
   */
  public chSeccional(event: any) {
    let model = {
      idSecretaria: "0",
      idDepartamento: event.value
    };
    this.lSecretaria$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);
  }


  /**
 * 
 * @param event 
 */
  btnChTipoConsulta(event: any) {
    switch (event.value) {
      case "N":
        this.fControl.controls["txtseccional"].disable();
        this.fControl.controls["txtmunicipio"].disable();
        this.fControl.controls["txtseccional"].setValue('');
        this.fControl.controls["txtmunicipio"].setValue('');
        break;
      case "S":
        this.fControl.controls["txtseccional"].enable();
        this.fControl.controls["txtmunicipio"].disable();
        this.fControl.controls["txtmunicipio"].setValue('');
        break;
      case "M":
        this.fControl.controls["txtseccional"].enable();
        this.fControl.controls["txtmunicipio"].enable();
        break;
      default:
        break;
    }
  }

  btnConsulta(event: any) {
    switch (event.value) {
      case "C":
        this.fControl.controls["txtfechainicial"].enable();
        this.fControl.controls["txtfechafinal"].enable();
        break;
      case "P":
        this.fControl.controls["txtfechainicial"].enable();
        this.fControl.controls["txtfechafinal"].enable();
        break;
      case "CP":
        this.fControl.controls["txtfechainicial"].disable();
        this.fControl.controls["txtfechafinal"].disable();
        this.fControl.controls["txtfechainicial"].setValue('');
        this.fControl.controls["txtfechafinal"].setValue('');
        break;
      case "PP":
        this.fControl.controls["txtfechainicial"].disable();
        this.fControl.controls["txtfechafinal"].disable();
        this.fControl.controls["txtfechainicial"].setValue('');
        this.fControl.controls["txtfechafinal"].setValue('');
        break;
      default:
        break;
    }
  }

  async btnGetConsulta(){
    let model = {
      "tipoConsulta": this.fControl.controls['txttipo'].value,
      "fechaInicial": this.fControl.controls['txtfechainicial'].value,
      "fechaFinal": this.fControl.controls['txtfechafinal'].value,
      "consultapor": this.fControl.controls['txtconsulta'].value,
      "seccional": this.fControl.controls['txtseccional'].value || 0,
      "secretaria": this.fControl.controls['txtmunicipio'].value || 0
    }
    let reponse = await this.recaudoTransferenciaStateService.ConsltarRecaudo(model);
    if (reponse.EsExitoso) {
      //this.btnExcel(reponse.Resultado);
    } else {
      this.objToast = {
        method: "danger",
        message: DITRA.MENSAJES.NO_INFORMACION
      }
    }

  }


}
