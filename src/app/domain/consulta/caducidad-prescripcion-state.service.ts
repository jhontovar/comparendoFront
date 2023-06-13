import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { BaseService, Respuesta } from 'src/app/core/service/base.service';
import { CaducidadPrescripcionService } from 'src/app/data/consulta/caducidad-prescripcion.service';
import { RespuestaCaduPrescripcion } from '../interface/respuesta-cadu-prescripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class CaducidadPrescripcionStateService extends BaseService {

  constructor(private caducidadPrescripcionService: CaducidadPrescripcionService) {
    super();
  }

  /**
   * 
   * @param model 
   * @returns 
   */
  public Consultar(model: any): Promise<Respuesta<Array<RespuestaCaduPrescripcion>>> {
    return firstValueFrom(this.caducidadPrescripcionService.Consultar(model).pipe(map(response => {
      return this.resultadosTipado<Array<RespuestaCaduPrescripcion>>(response);
    })));
  }
}
