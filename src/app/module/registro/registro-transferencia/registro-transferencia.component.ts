import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, take } from 'rxjs';
import { RecaudoTransferenciaStateService } from 'src/app/domain/consulta/recaudo-transferencia-state.service';
import { TransferenciasService } from '../../../domain/registro/transferencias.service-state';
import { ColDef, GridOptions } from 'ag-grid-community';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-registro-transferencia',
  templateUrl: './registro-transferencia.component.html',
  styleUrls: ['./registro-transferencia.component.scss']
})
export class RegistroTransferenciaComponent implements OnInit {

  public fControl: FormGroup;
  public fFiltro: FormGroup;
  public lSeccional$: Observable<any>;
  public lSecretaria$: Promise<any> = new Promise((resolve, reject) => { });
  public lSecretariaFiltro$: Promise<any> = new Promise((resolve, reject) => { });
  public bResult: boolean = false;

  public objToast: any = {};
  constructor(private fb: FormBuilder, private recaudoTransferenciaStateService: RecaudoTransferenciaStateService,
    private transferenciasService: TransferenciasService) {
    this.fControl = this.fb.group({
      txtdepartamento: [{ value: '', disabled: false }, [Validators.required],],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      textfechatransf: ['', [Validators.required]],
      txtfechainicial: ['', [Validators.required]],
      txtfechafinal: ['', [Validators.required]],
      txtvalor: [{ value: '0', disabled: false }, [Validators.required, Validators.min(1)]],
    });

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.fFiltro = this.fb.group({
      txtseccional: [{ value: '', disabled: false }],
      txtmunicipio: [{ value: '', disabled: true }, [Validators.required]],
      txtfechainicial: [formatDate(firstDay, 'yyyy-MM-dd', 'en'), [Validators.required]],
      txtfechafinal: [formatDate(date, 'yyyy-MM-dd', 'en'), [Validators.required]],
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
    const idDepartamento = this.fControl.controls['txtdepartamento'].value || "";
    this.fControl.controls["txtmunicipio"].enable();
    this.fControl.controls["txtmunicipio"].setValue('');
    this.fnGetSecretaria(idDepartamento);
  }

  /**
   * 
   * @param idDepartamento 
   */
  private fnGetSecretaria(idDepartamento: string) {
    let model = {
      idSecretaria: "0",
      idDepartamento: idDepartamento
    };
    this.lSecretaria$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);
  }


  /**
   * 
   */
  public chSeccionalFiltro() {
    const idDepartamento = this.fFiltro.controls['txtseccional'].value;
    if (!idDepartamento) {
      this.fFiltro.controls["txtmunicipio"].disable();
      this.fFiltro.controls["txtmunicipio"].setValue('');
      return;
    }
    this.fFiltro.controls["txtmunicipio"].enable();
    this.fFiltro.controls["txtmunicipio"].setValue('');
    this.fnGetSecretariaFiltro(idDepartamento);
  }


  /**
 * 
 * @param idDepartamento 
 */
  private fnGetSecretariaFiltro(idDepartamento: string) {
    let model = {
      idSecretaria: "0",
      idDepartamento: idDepartamento
    };
    this.lSecretariaFiltro$ = this.recaudoTransferenciaStateService.ConsltarSecretaria(model);
  }


  /**
  * Enviar registro transferencia
  */
  async btnAceptar() {
    let model = {
      idTransferencia: 0,
      fechaTransferencia: this.fControl.controls['textfechatransf'].value,
      idSecretaria: this.fControl.controls['txtmunicipio'].value || 0,
      vrTransferido: this.removeDots(this.fControl.controls['txtvalor'].value) || 0,
      fechaPeriodoInicio: this.fControl.controls['txtfechainicial'].value,
      fechaPeriodoFin: this.fControl.controls['txtfechafinal'].value,
    }

    let reponse = await this.transferenciasService.GuardarTransferencias(model);
    if (reponse.EsExitoso) {
      this.objToast = {
        method: "success",
        message: reponse.Mensaje
      }
      this.fControl.reset();
    } else {
      this.objToast = {
        method: "danger",
        message: reponse.Mensaje
      }
    }
  }

  /**
   * Consultar filtro
   */
  async btnConsultar() {
    this.bResult = false;
    let model = {
      idSecretaria: this.fFiltro.controls['txtmunicipio'].value || 0,
      fechaInicial: this.fFiltro.controls['txtfechainicial'].value,
      fechaFinal: this.fFiltro.controls['txtfechafinal'].value,
    }

    let reponse = await this.transferenciasService.ConsultarTransferencias(model);
    if (reponse.EsExitoso) {
      this.bResult = true;
      this.gridOptions.api?.setRowData(reponse.Resultado);
      this.gridOptions.api?.sizeColumnsToFit();
    } else {
      this.objToast = {
        method: "danger",
        message: reponse.Mensaje
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

    const numericValue = parseFloat(this.removeDots(this.fControl.controls['txtvalor'].value)) | 0;

    this.fControl.controls['txtvalor'].setValue(this.formatNumberWithCurrency(numericValue));
    // Formatea el valor cuando el usuario se sale del campo de entrada

  }
  removeDots(str: string): string {
    return str.replace(/\./g, '');
  }

  //#region Grid

  public columnDefs: ColDef[] = [
    { field: 'secretaria.descripcion', headerName: 'Secretaria' },
    { field: 'idTransferencia', headerName: 'Id Transferencia', hide: true },
    { field: 'fechaTransferencia', headerName: 'Fecha Transferencia', type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'fechaPeriodoInicio', headerName: 'Fecha Inicio', type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'fechaPeriodoFin', headerName: 'Fecha Fin', type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'vrTransferido', headerName: 'Valor', type: 'numberColumn' },
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
