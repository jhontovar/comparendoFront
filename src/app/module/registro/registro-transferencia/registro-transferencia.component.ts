import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';
import { TransferenciasService } from '../../../domain/registro/transferencias.service-state';


@Component({
  selector: 'app-registro-transferencia',
  templateUrl:'./registro-transferencia.component.html',
  styleUrls: ['./registro-transferencia.component.scss']
})
export class RegistroTransferenciaComponent implements OnInit {

  public fControl: FormGroup;
  public lSeccional$: Observable<any>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  ///////////////////////////////////////////////////////////////////////////
  public objToast: any = {};
  constructor(private fb: FormBuilder,private recaudoTransferenciaStateService: RecaudoTransferenciaStateService,
    private transferenciasService:TransferenciasService) 
  { 
      this.fControl = this.fb.group({  
      txtseccional: [{ value: '', disabled: false }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],    
      textfechatransf: ['', [Validators.required]],
      txtfechainicial: ['', [Validators.required]],
      txtfechafinal: ['', [Validators.required]],
      txttipo: ["1"],
      txtvalor:['', [Validators.required]],
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
      this.fControl.controls["txtmunicipio"].enable();
      this.fControl.controls["txtmunicipio"].setValue('');
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
   async btnDescargar() {
    let model = {
      
        idTransferencia: 2,
        fechaTransferencia: this.fControl.controls['textfechatransf'].value,
        idSecretaria: this.fControl.controls['txtmunicipio'].value || 0,
        vrTransferido:  this.fControl.controls['txtvalor'].value || 0,
        fechaPeriodoInicio: this.fControl.controls['txtfechainicial'].value,
        fechaPeriodoFin: this.fControl.controls['txtfechafinal'].value,

    }
    console.log(model);
     let reponse = await this.transferenciasService.GuardarTransferencias(model);
    if (reponse) {
      console.log(reponse)
    } else {
      this.objToast = {
        method: "danger",
        message:''
      }
    }
  }   
}
