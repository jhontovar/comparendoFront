import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';

@Component({
  selector: 'app-frm-recaudo-transferencia',
  templateUrl: './frm-recaudo-transferencia.component.html',
  styleUrls: ['./frm-recaudo-transferencia.component.scss']
})
export class FrmRecaudoTransferenciaComponent implements OnInit {

  public lSeccional$: Observable<any>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  public fControl: FormGroup;

  constructor(private fb: FormBuilder,
    private recaudoTransferenciaStateService: RecaudoTransferenciaStateService) {

    this.fControl = this.fb.group({
      txtseccional: [{ value: '', disabled: true }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      txttipo: ["1"],
      options: new FormArray([])
    });

    let model = { Descripcion: "" }
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
      Divipo: "",
      IdDepartamento: event.value
    };
    this.lSecretaria$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);
  }

  /**
   * 
   * @param event 
   */
  btnChTipoConsulta(event: any) {
    switch (event.value) {
      case "1":
        this.fControl.controls["txtseccional"].disable();
        this.fControl.controls["txtmunicipio"].disable();
        this.fControl.controls["txtseccional"].setValue('');
        this.fControl.controls["txtmunicipio"].setValue('');
        break;
      case "2":
        this.fControl.controls["txtseccional"].enable();
        this.fControl.controls["txtmunicipio"].disable();
        this.fControl.controls["txtmunicipio"].setValue('');
        break;
      case "3":
        this.fControl.controls["txtseccional"].enable();
        this.fControl.controls["txtmunicipio"].enable();
        break;
      default:
        break;
    }
  }

  /**
   * Descargar
   */
  btnDescargar() {

  }


}
