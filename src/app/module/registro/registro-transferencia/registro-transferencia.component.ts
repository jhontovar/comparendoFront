import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Observable, map, take } from 'rxjs';
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
      txtvalor:[{ value: '0', disabled: false }, [Validators.required,Validators.min(1)]],
    });
    let model = { IdSeccional: "0" }
    this.lSeccional$ = this.recaudoTransferenciaStateService.ConsltarSeccional(model);
    
  }

  ngOnInit(): void {
  }

    /**
   * Consultar secretaria

   */
    public chSeccional() {

      this.fControl.controls["txtmunicipio"].enable();
      this.fControl.controls["txtmunicipio"].setValue('');
      // this.lSecretaria$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);

      
      const idpto = this.fControl.controls['txtseccional'].value||"";
      //,
      if (idpto) {
        this.fnGetSecretaria(idpto);
      }
    }
    private fnGetSecretaria(idDepartamento: string) {
      let model = {
        idSecretaria: "0",
        idDepartamento: idDepartamento
      };
      this.lSecretaria$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);
    }


   /**
   * Descargar
   */
   async btnDescargar() {
    let model = {
      
        idTransferencia: 0,
        fechaTransferencia: this.fControl.controls['textfechatransf'].value,
        idSecretaria: this.fControl.controls['txtmunicipio'].value || 0,
        vrTransferido:  this.removeDots(this.fControl.controls['txtvalor'].value) || 0,
        fechaPeriodoInicio: this.fControl.controls['txtfechainicial'].value,
        fechaPeriodoFin: this.fControl.controls['txtfechafinal'].value,

    }
    console.log(model);
     let reponse = await this.transferenciasService.GuardarTransferencias(model);
    if (reponse.EsExitoso) {
      this.objToast = {
        method: "success",
        message:reponse.Mensaje
      }
      this.fControl.reset();
    } else {
      this.objToast = {
        method: "danger",
        message:reponse.Mensaje
      }
    }
  }   

  formatNumberWithCurrency(value: number): string {
    const formattedValue = value.toLocaleString('es');
    return formattedValue;
  }

  onInputChange(): void {
    // Formatea el valor mientras el usuario escribe
    
  }
  onModelChange(): void {
    // Realiza cualquier acción adicional al cambiar el valor (opcional)
  }
  onInputBlur(): void {
      // Formatea el valor cuando el usuario se sale del campo de entrada
      
  const numericValue = parseFloat(this.removeDots(this.fControl.controls['txtvalor'].value))|0;

  this.fControl.controls['txtvalor'].setValue(this.formatNumberWithCurrency(numericValue));
    // Formatea el valor cuando el usuario se sale del campo de entrada

  }
  removeDots(str: string):string {
    return str.replace(/\./g, '');
  }
}
