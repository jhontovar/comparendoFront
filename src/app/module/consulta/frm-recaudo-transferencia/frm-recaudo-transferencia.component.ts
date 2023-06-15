import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common'
import { Observable, map, take } from 'rxjs';
import { DITRA } from 'src/app/core/constant/ditra.constants';
import { ExcelService } from 'src/app/core/service/excel.service';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';
import { RespuestaRecaudo } from 'src/app/domain/interface/respuesta-seccional.interface';
import { ColDef, GridOptions } from 'ag-grid-community';

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
  public bResult: boolean = false;

  constructor(private fb: FormBuilder, private excelService: ExcelService,
    private recaudoTransferenciaStateService: RecaudoTransferenciaStateService) {

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.fControl = this.fb.group({
      txtseccional: [{ value: '', disabled: true }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      txttipo: ["N"],
      txttransferido: ['A'],
      txtfechainicial: [formatDate(firstDay, 'yyyy-MM-dd', 'en'), [Validators.required]],
      txtfechafinal: [formatDate(date, 'yyyy-MM-dd', 'en'), [Validators.required]],
      options: new FormArray([])
    });

    let model = { idSeccional: "0" }
    this.lSeccional$ = this.recaudoTransferenciaStateService.ConsltarSeccional(model);
  }

  ngOnInit(): void {
  }

  /**
   * Consultar secretaria
   */
  public chSeccional() {
    let idDepartamento: string = "";
    const idSeccional = this.fControl.controls['txtseccional'].value;
    //,
    this.lSeccional$.pipe(map(lseccional => lseccional.filter((seccional: any) => seccional.idSeccional === parseInt(idSeccional))), take(1))
      .subscribe({
        next: (val) => {
          if (val.length == 1) {
            idDepartamento = val[0].idDepartamento || "";
            if (idDepartamento) {
              this.fnGetSecretaria(idDepartamento);
            }
          }
        }
      })
  }

  private fnGetSecretaria(idDepartamento: string) {
    let model = {
      idSecretaria: "0",
      idDepartamento: idDepartamento
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

  async btnConsultar() {
    this.bResult = false;
    let model = {
      "tipoConsulta": this.fControl.controls['txttipo'].value,
      "fechaInicial": this.fControl.controls['txtfechainicial'].value,
      "fechaFinal": this.fControl.controls['txtfechafinal'].value,
      "transferido": this.fControl.controls['txttransferido'].value,
      "seccional": this.fControl.controls['txtseccional'].value || 0,
      "secretaria": this.fControl.controls['txtmunicipio'].value || 0
    }
    let reponse = await this.recaudoTransferenciaStateService.ConsultarRecaudo(model);
    if (reponse.EsExitoso) {
      this.bResult = true;
      this.gridOptions.api?.setRowData(reponse.Resultado);
      this.gridOptions.api?.sizeColumnsToFit();
    } else {
      this.objToast = {
        method: "danger",
        message: DITRA.MENSAJES.NO_INFORMACION
      }
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
    let reponse = await this.recaudoTransferenciaStateService.ConsultarRecaudo(model);
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
        comparendo: element.comparendo.nroComparendo,
        resolucion: element.resolucion.nroResolucion,
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

    let lHeader = ['Número de comparendo', 'Número de resolucion', 'Departamento', 'Municipio', 'Número de documento infractor',
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

  //#region Grid

  public columnDefs: ColDef[] = [
    { field: 'idRecaudo', headerName: 'Id Recaudo', hide: true },
    { field: 'comparendo.nroComparendo', headerName: 'Nro Comparendo' },
    { field: 'resolucion.nroResolucion', headerName: 'Nro Resolucion' },
    { field: 'secretaria.departamento.descripcion', headerName: 'Departamento' },
    { field: 'secretaria.descripcion', headerName: 'Secretaria' },

    {
      field: 'documento', headerName: 'Nro Documento',
      valueGetter: (row) => {
        return row.data?.comparendo?.documento?.documento || row.data?.resolucion?.documento?.documento
      }
    },

    {
      field: 'codigoInfraccion', headerName: 'Código Infracción',
      valueGetter: (row) => {
        return row.data?.comparendo?.infraccion?.codigoInfraccion || row.data?.resolucion?.infraccion?.codigoInfraccion
      }
    },

    {
      field: 'comparendo.infraccion.vrDiarioDesde', headerName: 'Cantidad SMDLV',
      valueGetter: (row) => {
        return row.data?.comparendo?.infraccion?.vrDiarioDesde || row.data?.resolucion?.infraccion?.vrDiarioDesde
      }
    },
    { field: 'vrPagado', headerName: 'Total pagado' },
    { field: 'porcentajeSimit', headerName: 'Porcentaje SIMIT' },
    { field: 'vrSimit', headerName: 'Valor SIMIT' },
    { field: 'porcentajeDitra', headerName: 'Porcentaje DITRA' },
    { field: 'vrDitra', headerName: 'Valor DITRA' },
    { field: 'porcentajeMunicipio', headerName: 'Porcentaje municipio' },
    { field: 'vrMunicipio', headerName: 'Valor municipio' },
    { field: 'fechaRecaudo', headerName: 'Fecha contable' },
    { field: 'tipoRec.descripcion', headerName: 'Tipo de recaudo' },
    { field: 'porcentajeDescuento', headerName: 'Porcentaje de descuento' },
    { field: 'vrDescuento', headerName: 'Valor de descuento' },
    { field: 'nroRadicado', headerName: 'Nro Radicado' },
    { field: 'fechaRadicado', headerName: 'Fecha radicado' },
  ];

  public gridOptions: GridOptions = {};
  public defaultColDef = {
    filter: 'agTextColumnFilter',
    sortable: true,
    resizable: true
  }

  public onGridReady(grid: any) {
    this.gridOptions = grid;
    this.gridOptions.api?.sizeColumnsToFit();
  }

  //searc by text in grid
  public onFilterTextBoxChanged(event: any) {
    if (!event.value) {
      this.gridOptions.api?.setQuickFilter("");
      return;
    }
    this.gridOptions.api?.setQuickFilter(event.value);
  }

  public onBtExport() {
    var params = {
      fileName: "report.csv",
      columnSeparator: ","
    };
    this.gridOptions.api?.exportDataAsCsv(params);
  }

  public onautoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridOptions.columnApi?.getAllColumns()!.forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    this.gridOptions.columnApi?.autoSizeColumns(allColumnIds, skipHeader);
  }

  //#endregion





}
