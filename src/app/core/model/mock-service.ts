// src/app/user.service.ts
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class MockService {

    constructor() { }

    getDataComparendo(): Observable<any> {
        return of(this.data)
    }

    data = { "esExitoso": true, "mensaje": null, "resultado": { "idComparendo": 3, "nroComparendo": "9819278", "fechaComp": "2023-05-22T02:05:52", "horaComp": "0001-01-01T00:00:00", "idEstadoComp": 1, "idSecretaria": 1, "fechaCargaSimit": "2023-05-22T02:05:52", "idDocumento": 1, "idPlacaPatrullero": 0, "idInfraccion": 4720, "resoluciones": [{ "idResolucion": 1, "nroResolucion": "126162", "nroResolucionAnt": "000111", "fechaResolucion": "2023-05-14T21:14:19", "idTipoRes": 1, "idCartera": 1, "idComparendo": null, "idDocumento": 0, "idSecretaria": 1, "fechaCargaSimit": "2023-05-15T21:14:13", "idInfraccion": 6870, "tipoRes": { "idTipoRes": 0, "descripcion": "Sancion" }, "infraccion": { "idInfraccion": 0, "codigoInfraccion": "E02", "descripcion": null, "vrDiarioDesde": null, "vrDiarioHasta": null, "vrUvtDesde": null, "vrUvtHasta": null, "municipal": null, "idSecretaria": 0 }, "cartera": { "idCartera": 0, "idTipoCartera": 1, "totalCartera": 500000, "saldoCartera": 450000, "tipoCartera": { "idTipoCartera": 0, "descripcion": "Pendiente de pago" } } }], "recaudos": [{ "idRecaudo": 1, "idComparendo": 3, "idResolucion": 1, "referencia": "1", "fechaTransaccion": "2023-05-22T21:19:41", "fechaRecaudo": "2023-05-22T21:19:45", "procedencia": true, "idTipoRec": true, "porcentajeDescuento": 10, "vrDescuento": 0, "vrPagado": 10, "transferido": "0", "fechaTransferencia": "2023-05-22T21:20:01", "vrTransferido": 0, "porcentajeDitra": 10, "vrDitra": 0, "porcentajeSimit": 10, "vrSimit": 0, "porcentajeMunicipio": 10, "vrMunicipio": 0, "idSecretaria": 1, "nroRadicado": 1, "fechaRadicado": null, "tipoRec": { "idTipoRec": false, "descripcion": "Comparendo" } }], "infractor": { "idDocumento": 0, "documento": "107918212", "idTipoDoc": 1, "nombres": "jhon", "apellidos": "tovar", "tipoDoc": { "idTipoDoc": 0, "descripcion": "Cédula" } }, "infraccion": { "idInfraccion": 0, "codigoInfraccion": "186", "descripcion": "Infracción Municipal", "vrDiarioDesde": null, "vrDiarioHasta": null, "vrUvtDesde": null, "vrUvtHasta": null, "municipal": null, "idSecretaria": 0 }, "estadoComp": { "idEstado": 0, "descripcion": "Pendiente" }, "secretaria": { "idSecretaria": 0, "divipo": "05001000", "descripcion": "Medellin", "idTipoSecretaria": "M", "idDepartamento": "05" } } }
}