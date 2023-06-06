import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common'
import { Observable } from 'rxjs';
import { DITRA } from 'src/app/core/constant/ditra.constants';
import { ExcelService } from 'src/app/core/service/excel.service';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';
import { RespuestaRecaudo } from 'src/app/domain/interface/respuesta-seccional.interface';

@Component({
  selector: 'app-frm-recaudo-transferencia',
  templateUrl: './frm-recaudo-transferencia.component.html',
  styleUrls: ['./frm-recaudo-transferencia.component.scss']
})
export class FrmRecaudoTransferenciaComponent implements OnInit {

  public lSeccional$: Observable<any>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  public fControl: FormGroup;
  public objToast: any = {};
  public descargaExitosa: boolean = false;
  public CONSTANT = DITRA;

  constructor(private fb: FormBuilder, private excelService: ExcelService,
    private recaudoTransferenciaStateService: RecaudoTransferenciaStateService) {

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.fControl = this.fb.group({
      txtseccional: [{ value: '', disabled: true }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      txttipo: ["C"],
      txttransferido: ['A'],
      txtfechainicial: [formatDate(firstDay, 'yyyy-MM-dd', 'en'), [Validators.required]],
      txtfechafinal: [formatDate(date, 'yyyy-MM-dd', 'en'), [Validators.required]],
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

  /**
   * Descargar
   */
  async btnDescargar() {
    let model = {
      "tipoConsulta": this.fControl.controls['txttipo'].value,
      "fechaInicial": this.fControl.controls['txtfechainicial'].value,
      "fechaFinal": this.fControl.controls['txtfechafinal'].value,
      "transferido": this.fControl.controls['txttransferido'].value,
      "seccional": this.fControl.controls['txtseccional'].value || 0,
      "secretaria": this.fControl.controls['txtmunicipio'].value || 0
    }
    let reponse = await this.recaudoTransferenciaStateService.ConsltarRecaudo(model);
    if (reponse.EsExitoso) {
      this.btnExcel(reponse.Resultado);
    } else {
      this.objToast = {
        method: "danger",
        message: DITRA.MENSAJES.NO_INFORMACION
      }
    }
  }

  /**
  * 
  */
  public btnExcel(reponse: Array<RespuestaRecaudo>) {
    let lRecaudo: Array<RespuestaRecaudo> = [];
    reponse?.forEach((element: RespuestaRecaudo) => {
      lRecaudo.push({
        idRecaudo: element.idRecaudo,
        txtDepartamento: element.secretaria?.departamento?.descripcion,
        txtMunicipio: element.secretaria?.descripcion,
        txtDocumento: element.comparendo?.documento?.documento || element.resolucion?.documento?.documento,
        txtTipoInfraccion: element.comparendo?.infraccion?.codigoInfraccion || element.resolucion?.infraccion?.codigoInfraccion,
        txtVrDiarioDesde: element.comparendo?.infraccion?.vrDiarioDesde || element.resolucion?.infraccion?.vrDiarioDesde,
        vrPagado: element.vrPagado,
        porcentajeSimit: element.porcentajeSimit,
        vrSimit: element.vrSimit,
        porcentajeDitra: element.porcentajeDitra,
        vrDitra: element.vrDitra,
        porcentajeMunicipio: element.porcentajeMunicipio,
        vrMunicipio: element.vrMunicipio,
        fechaRecaudo: element.fechaRecaudo,
        txtTipoRecaudo: element.tipoRec.descripcion,
        porcentajeDescuento: element.porcentajeDescuento,
        vrDescuento: element.vrDescuento,
        nroRadicado: element.nroRadicado,
        fechaRadicado: element.fechaRadicado
      })
    });

    let lHeader = ['Número de comparendo', 'Departamento', 'Municipio', 'Número de documento infractor',
      'Tipo de infracción', 'Cantidad de SMDLV', 'Total pagado ', 'Porcentaje SIMIT',
      'Valor SIMIT', 'Porcentaje DITRA', 'Valor DITRA', 'Porcentaje municipio', 'Valor municipio',
      'Fecha contable', 'Tipo de recaudo', 'Porcentaje de descuento', 'Valor de descuento'
      , 'Número de radicado', 'Fecha radicado'
    ];

    const fechaActual = new Date().toISOString().split("T").join(" ").split("Z").join("");
    let nombreReporte = DITRA.CONFIGURACION.NOMBRE_REPORTE.concat(fechaActual)
    this.excelService.exportExcelWhitHeaders(lRecaudo, nombreReporte, lHeader);
    this.descargaExitosa = true;
  }



}
