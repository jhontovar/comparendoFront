import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { DITRA } from 'src/app/core/constant/ditra.constants';
import { ExcelService } from 'src/app/core/service/excel.service';
import { PdfService } from 'src/app/core/service/pdf.service';
import { ComparendoStateService } from 'src/app/domain/consulta/comparendo-state.service';
import { RespuestaComparendoDto } from 'src/app/domain/interface/respuesta-comparendo.interface';

@Component({
  selector: 'app-frm-comparendo',
  templateUrl: './frm-comparendo.component.html',
  styleUrls: ['./frm-comparendo.component.scss']
})
export class FrmComparendoComponent implements OnInit {
  public oRespone: RespuestaComparendoDto = {}; //
  public fPaciente: FormGroup;
  public objToast: any = {};


  constructor(private fb: FormBuilder, private comparendoStateService: ComparendoStateService,
    private pdfService: PdfService, private excelService: ExcelService) {
    this.fPaciente = this.fb.group({
      txtComparendo: ['99999999000005435316', [Validators.required]],
      options: new FormArray([])
    });
  }

  ngOnInit(): void {
  }

  public btnGetComparendo() {
    let model = {
      nroComparendo: this.fPaciente.controls['txtComparendo'].value //"9819278"
    };

    this.comparendoStateService.ComparendosConsultar(model).subscribe({
      next: (response) => {
        this.oRespone = {};
        if (response.EsExitoso) {
          this.oRespone = response.Resultado


          this.oRespone.fechaHora = this.fnConvertStringDate(this.oRespone.fechaComp || "", this.oRespone.horaComp || "");
          this.oRespone.jurisdiccion = this.oRespone.secretaria.divipo + '-' + this.oRespone.secretaria.descripcion;
          this.oRespone.nombreApellido = this.oRespone.infractor.nombres + ' ' + this.oRespone.infractor.apellidos;

          this.gridOptionsResolucion.api?.setRowData(this.oRespone.resoluciones);
          this.gridOptionsResolucion.api?.sizeColumnsToFit();
          this.gridOptionsRecaudo.api?.setRowData(this.oRespone.recaudos);
          this.gridOptionsRecaudo.api?.sizeColumnsToFit();
        } else {
          this.objToast = {
            method: "danger",
            message: DITRA.MENSAJES.NO_INFORMACION
          }
        }
      }
    });
  }

  /**
   * 
   * @param date 
   * @param hour 
   * @returns 
   */
  private fnConvertStringDate(date: string, hour: string) {
    try {
      let _date = new Date(date);
      let _hour = new Date(hour);

      return _date.toLocaleDateString() + ' ' + _hour.toLocaleTimeString();
    } catch (error) {
      return '00/00/0000';
    }
  }

  //#region 

  /**
   * 
   */
  public async btnPdf() {
    let arrayResolucion: Array<any> = [];
    arrayResolucion.push(['Nro Resolución', 'Nro Resolución Ant', 'Tipo Resolución', 'Codigo Infraccion', 'Valor Resolución', 'Vr Cartera', 'Estado']);
    this.oRespone.resoluciones?.forEach((element: any) => {
      arrayResolucion.push([element.nroResolucion,
      element.nroResolucionAnt,
      element.tipoRes.descripcion,
      element.infraccion.codigoInfraccion,
      element.cartera.totalCartera,
      element.cartera.saldoCartera,
      element.cartera.tipoCartera.descripcion,
      ])
    });
    /////////////
    let arrayRecaudo: Array<any> = [];
    arrayRecaudo.push(['Descripción', 'Vr Descuento', 'Porcentaje Descuento', 'Vr Pagado', 'Transferido', 'Fec Transferencia', 'Vr Transferido']);
    this.oRespone.recaudos?.forEach((element: any) => {
      arrayRecaudo.push([element.tipoRec.descripcion,
      element.vrDescuento,
      element.porcentajeDescuento,
      element.vrPagado,
      element.transferido,
      element.fechaTransferencia,
      element.vrTransferido,
      ])
    });

    var dataPdf = {
      content: [
        {
          margin: [0, 20, 0, 0],
          text: 'Comparendo \n\n', style: 'tableHeader'
        },
        {
          alignment: 'left',
          columns: [
            {
              text: 'Nro Comparendo:'
            },
            {
              text: this.oRespone.nroComparendo
            },
            {
              text: 'Fec Comparendo:'
            },
            {
              text: this.oRespone.fechaHora
            }
          ]
        },
        '\n',
        {
          alignment: 'left',
          columns: [
            {
              text: 'Jurisdicción:'
            },
            {
              text: this.oRespone.jurisdiccion
            },
            {
              text: 'Estado:'
            },
            {
              text: this.oRespone.estadoComp?.descripcion
            }
          ]
        },
        '\n',
        {
          alignment: 'left',
          columns: [
            {
              text: 'Nro Documento:'
            },
            {
              text: this.oRespone.infractor?.documento
            },
            {
              text: 'Nombres:'
            },
            {
              text: this.oRespone.nombreApellido
            }
          ]
        },
        '\n',
        { text: 'Resolución \n\n', style: 'tableHeader' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: arrayResolucion
          }
        },
        '\n',
        { text: 'Recaudo \n\n', style: 'tableHeader' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: arrayRecaudo
          }
        }

      ]
    }

    let template = this.pdfService.generarTemplatePDF("Resporte Por Comparendo");
    template.hoja.content = template.hoja.content.concat(dataPdf.content)
    this.pdfService.generarPDF(template);
  }

  /**
   * 
   */
  public async btnExcel() {
    let arrayResolucion: Array<any> = [];
    this.oRespone.resoluciones?.forEach((element: any) => {
      arrayResolucion.push(
        {
          nroComparendo: this.oRespone.nroComparendo,
          fechaHora: this.oRespone.fechaHora,
          jurisdiccion: this.oRespone.jurisdiccion,
          estadoCompDescripcion: this.oRespone.estadoComp?.descripcion,
          documento: this.oRespone.infractor?.documento,
          nombreApellido: this.oRespone.nombreApellido,

          nroResolucion: element.nroResolucion,
          nroResolucionAnt: element.nroResolucionAnt,
          tipoResDescripcion: element.tipoRes.descripcion,
          codigoInfraccion: element.infraccion.codigoInfraccion,
          totalCartera: element.cartera.totalCartera,
          saldoCartera: element.cartera.saldoCartera,
          tipoCarteraSescripcion: element.cartera.tipoCartera.descripcion,
        })
    });

    let arrayRecaudo: Array<any> = [];
    this.oRespone.recaudos?.forEach((element: any) => {
      arrayRecaudo.push(
        {
          nroComparendo: this.oRespone.nroComparendo,
          fechaHora: this.oRespone.fechaHora,
          jurisdiccion: this.oRespone.jurisdiccion,
          estadoCompDescripcion: this.oRespone.estadoComp?.descripcion,
          documento: this.oRespone.infractor?.documento,
          nombreApellido: this.oRespone.nombreApellido,

          descripcion: element.tipoRec.descripcion,
          vrDescuento: element.vrDescuento,
          porcentajeDescuento: element.porcentajeDescuento,
          vrPagado: element.vrPagado,
          transferido: element.transferido,
          fechaTransferencia: element.fechaTransferencia,
          vrTransferido: element.vrTransferido,
        })
    });

    let lData = [
      arrayResolucion,
      arrayRecaudo
    ]

    let lHeader = [
      ['Nro Comparendo', 'Fec Comparendo', 'Jurisdicción', 'Estado Comparendo', 'Nro Documento', 'Nombres', 'Nro Resolución', 'Nro Resolución Ant', 'Tipo Resolución', 'Codigo Infraccion', 'Valor Resolución', 'Vr Cartera', 'Estado'],
      ['Nro Comparendo', 'Fec Comparendo', 'Jurisdicción', 'Estado Comparendo', 'Nro Documento', 'Nombres', 'Descripción', 'Vr Descuento', 'Porcentaje Descuento', 'Vr Pagado', 'Transferido', 'Fec Transferencia', 'Vr Transferido']
    ];

    const fechaActual = new Date().toISOString().split("T").join(" ").split("Z").join("");
    let nombreReporte = DITRA.CONFIGURACION.NOMBRE_REPORTE.concat(fechaActual)
    let lShetsName: string[] = ["Resolución", "Recaudo"];
    this.excelService.exportAsExcelFilebySheets(lData, nombreReporte, lShetsName, lHeader, []);
  }

  //#endregion

  //#region Grid

  columnDefs: ColDef[] = [
    { field: 'nroResolucion' },
    { field: 'nroResolucionAnt' },
    { field: 'tipoRes.descripcion' },
    { field: 'infraccion.codigoInfraccion' },
    { field: 'cartera.totalCartera', headerName: "Valor Resolucion" },
    { field: 'cartera.saldoCartera', headerName: "Valor Cartera" },
    { field: 'cartera.tipoCartera.descripcion', headerName: "Estado" }
  ];

  columnDefsRecaudo: ColDef[] = [
    { field: 'tipoRec.descripcion' },
    { field: 'vrDescuento' },
    { field: 'porcentajeDescuento' },
    { field: 'vrPagado' },
    { field: 'transferido' },
    { field: 'fechaTransferencia' },
    { field: 'vrTransferido' }
  ];

  gridOptionsResolucion: any;
  gridOptionsRecaudo: any;
  defaultColDef = {
    filter: 'agTextColumnFilter',
    sortable: true,
    resizable: true
  }

  onGridReady(grid: any) {
    this.gridOptionsResolucion = grid;
    this.gridOptionsResolucion.api?.sizeColumnsToFit();
  }

  onGridReadyRecaudo(grid: any) {
    this.gridOptionsRecaudo = grid;
  }

  //searc by text in grid
  onFilterTextBoxChanged(event: any, grid: string) {
    if (grid == "gridOptionsResolucion") {
      if (!event.value) {
        this.gridOptionsResolucion.api?.setQuickFilter("");
        return;
      }
      this.gridOptionsResolucion.api?.setQuickFilter(event.value);
    }
    if (grid == "gridOptionsRecaudo") {
      if (!event.value) {
        this.gridOptionsRecaudo.api?.setQuickFilter("");
        return;
      }
      this.gridOptionsRecaudo.api?.setQuickFilter(event.value);
    }
  }

  onBtExport(grid: string) {
    if (grid == "gridOptionsResolucion") {
      var params = {
        fileName: this.gridOptionsResolucion.exportFileName,
        columnSeparator: ","
      };
      this.gridOptionsResolucion.api?.exportDataAsCsv(params);
    }
    if (grid == "gridOptionsRecaudo") {
      var params = {
        fileName: this.gridOptionsRecaudo.exportFileName || "data.csv",
        columnSeparator: ","
      };
      this.gridOptionsRecaudo.api?.exportDataAsCsv(params);
    }
  }

  autoSizeAll(skipHeader: boolean, grid: string) {
    if (grid == "gridOptionsResolucion") {
      const allColumnIds: string[] = [];
      this.gridOptionsResolucion.columnApi?.getAllColumns()!.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });
      this.gridOptionsResolucion.columnApi?.autoSizeColumns(allColumnIds, skipHeader);
    }
    if (grid == "gridOptionsRecaudo") {
      const allColumnIds: string[] = [];
      this.gridOptionsRecaudo.columnApi?.getAllColumns()!.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });
      this.gridOptionsRecaudo.columnApi?.autoSizeColumns(allColumnIds, skipHeader);
    }
  }

  //#endregion

}
