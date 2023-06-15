import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable, filter, map, take } from 'rxjs';
import { DITRA } from 'src/app/core/constant/ditra.constants';
import { ExcelService } from 'src/app/core/service/excel.service';
import { CaducidadPrescripcionStateService } from 'src/app/domain/consulta/caducidad-prescripcion-state.service';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';
import { RespuestaCaduPrescripcion } from 'src/app/domain/interface/respuesta-cadu-prescripcion.interface';
import { Seccional } from 'src/app/domain/interface/seccional.interface';

@Component({
  selector: 'app-frm-caducidades',
  templateUrl: './frm-caducidades.component.html',
  styleUrls: ['./frm-caducidades.component.scss']
})
export class FrmCaducidadesComponent implements OnInit {
  public fControl: FormGroup;
  public lSeccional$: Observable<Array<Seccional>>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  public objToast: any = {};
  public bResult: boolean = false;
  public bDescargaExitosa: boolean = false
  public oSeccional: any;

  constructor(private fb: FormBuilder, private recaudoTransferenciaStateService: RecaudoTransferenciaStateService,
    private caducidadPrescripcionStateService: CaducidadPrescripcionStateService, private excelService: ExcelService) {
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

  foSeccional(event: any) {

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
  onTipoConsulta(event: any) {
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

  onConsulta(event: any) {
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
        // this.fControl.controls["txtfechainicial"].setValue('');
        // this.fControl.controls["txtfechafinal"].setValue('');
        break;
      case "PP":
        this.fControl.controls["txtfechainicial"].disable();
        this.fControl.controls["txtfechafinal"].disable();
        // this.fControl.controls["txtfechainicial"].setValue('');
        // this.fControl.controls["txtfechafinal"].setValue('');
        break;
      default:
        break;
    }
  }

  async btnGetConsulta() {
    this.bResult = false;
    let model = {
      "tipoConsulta": this.fControl.controls['txttipo'].value,
      "fechaInicial": this.fControl.controls['txtfechainicial'].value || undefined,
      "fechaFinal": this.fControl.controls['txtfechafinal'].value || undefined,
      "consultapor": this.fControl.controls['txtconsulta'].value,
      "seccional": this.fControl.controls['txtseccional'].value || 0,
      "secretaria": this.fControl.controls['txtmunicipio'].value || 0
    }
    let reponse = await this.caducidadPrescripcionStateService.Consultar(model);
    if (reponse?.EsExitoso) {
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


  async btnDescargar() {
    this.bResult = false;
    let model = {
      "tipoConsulta": this.fControl.controls['txttipo'].value,
      "fechaInicial": this.fControl.controls['txtfechainicial'].value,
      "fechaFinal": this.fControl.controls['txtfechafinal'].value,
      "consultapor": this.fControl.controls['txtconsulta'].value,
      "seccional": this.fControl.controls['txtseccional'].value || 0,
      "secretaria": this.fControl.controls['txtmunicipio'].value || 0
    }
    let reponse = await this.caducidadPrescripcionStateService.Consultar(model);
    if (reponse?.EsExitoso) {
      this.btnExcel(reponse.Resultado);
    } else {
      this.objToast = {
        method: "danger",
        message: DITRA.MENSAJES.NO_INFORMACION
      }
    }
  }

  public btnExcel(reponse: Array<RespuestaCaduPrescripcion>) {
    let lRecaudo: Array<RespuestaCaduPrescripcion> = [];
    reponse?.forEach((element: RespuestaCaduPrescripcion) => {
      lRecaudo.push({
        txtMunicipio: element.secretaria?.descripcion,
        txtDepartamento: element.secretaria?.departamento.descripcion,
        txtNroResolucion: element.resolucion.nroResolucion,
        txtFechaResolucion: element.resolucion.fechaResolucion,
        txtNombre: element.infractor.nombres,
        txtApellido: element.infractor.apellidos,
        txtDocumento: element.infractor.tipoDoc.descripcion,
        txtTipoDocumento: element.infractor?.tipoDoc.descripcion,
        txtcodigoInfraccion: element.comparendo.infraccion.codigoInfraccion,
        txtNroComparendo: element.comparendo.nroComparendo,
        txtFehaComparendo: element.comparendo.fechaComp
      })
    });

    let lHeader = ['Secretaria', 'Departamento', 'Nro Resolución', 'Fecha Resolución', 'Nombre',
      'Apellido', 'Documento', 'Tipo Documento', 'Codigo Infracción',
      'Nro Comparendo', 'Fecha Comparendo'
    ];

    const fechaActual = new Date().toISOString().split("T").join(" ").split("Z").join("");
    let nombreReporte = DITRA.CONFIGURACION.NOMBRE_REPORTE.concat(fechaActual)
    this.excelService.exportExcelWhitHeaders(lRecaudo, nombreReporte, lHeader);
    this.bDescargaExitosa = true;
  }

  //#region Grid

  public columnDefs: ColDef[] = [
    { field: 'secretaria.descripcion', headerName: 'Secretaria' },
    { field: 'secretaria.departamento.operador.descripcion', headerName: 'Nombre Operador' },
    { field: 'secretaria.departamento.operador.zona', headerName: 'Zona' },
    { field: 'secretaria.departamento.descripcion', headerName: 'Departamento' },
    { field: 'resolucion.nroResolucion', headerName: 'Nro Resolución' },
    { field: 'resolucion.fechaResolucion', headerName: 'Fecha Resolución' },
    { field: 'comparendo.nroComparendo', headerName: 'Nro Comparendo' },
    { field: 'comparendo.fechaComp', headerName: 'Fecha Comparendo' },
    { field: 'infractor.nombres', headerName: 'Nombre' },
    { field: 'infractor.apellidos', headerName: 'Apellido' },
    { field: 'infractor.documento', headerName: 'Documento' },
    { field: 'infractor.tipoDoc.descripcion', headerName: 'Tipo Documento' },
    { field: 'comparendo.infraccion.codigoInfraccion', headerName: 'Codigo Infracción' },
    { field: 'fechaCaducar', headerName: 'Fecha a Caducar' },
    { field: 'cartera.totalCartera', headerName: 'Total Cartera' },
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
