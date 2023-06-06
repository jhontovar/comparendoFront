import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseService, Respuesta } from 'src/app/core/service/base.service';
import { RecaudoTransferenciaService } from 'src/app/data/consulta/recaudo-transferencia.service';
import { Seccional } from '../interface/seccional.interface';
import { Secretaria } from '../interface/secretaria.interface';
import { RespuestaRecaudo } from '../interface/respuesta-seccional.interface';

@Injectable({
  providedIn: 'root'
})
export class RecaudoTransferenciaStateService extends BaseService {

  constructor(private recaudoTransferenciaService: RecaudoTransferenciaService) {
    super();
  }

  /**
 *
 * @param model
 * @returns
 */
  public ConsltarSeccional(model: any):Observable<Respuesta<Array<Seccional>>> {
    return this.recaudoTransferenciaService.ConsltarSeccional(model).pipe(map(response => {
      return this.resultadosTipado<Array<Seccional>>(response);
    }));
  }

  /**
*
* @param model
* @returns
*/
  public ConsltarSecretaria(model: any):Promise<Respuesta<Secretaria>> {
    return firstValueFrom(this.recaudoTransferenciaService.ConsltarSecretaria(model).pipe(map(response => {
      return this.resultadosTipado<Secretaria>(response);
    })));
  }

    /**
*
* @param model
* @returns
*/
public ConsltarRecaudo(model: any):Promise<Respuesta<Array<RespuestaRecaudo>>> {
  return firstValueFrom(this.recaudoTransferenciaService.ConsltarRecaudo(model).pipe(map(response => {
    return this.resultadosTipado<Array<RespuestaRecaudo>>(response);
  })));
}
}
