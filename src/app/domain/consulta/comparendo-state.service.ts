import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/core/service/base.service';
import { ComparendoService } from 'src/app/data/consulta/comparendo.service';
import { RespuestaComparendoDto } from '../interface/respuesta-comparendo.interface';
import { MockService } from 'src/app/core/model/mock-service';

@Injectable({
  providedIn: 'root'
})
export class ComparendoStateService extends BaseService {

  constructor(private comparendoService: ComparendoService, private mock: MockService) {
    super();
  }

  /**
 *
 * @param model
 * @returns
 */
  public ComparendosConsultar(model: any) {
    return this.comparendoService.ComparendosConsultar(model).pipe(map(response => {
      return this.resultadosTipado<RespuestaComparendoDto>(response);
    }));


    // return this.mock.getDataComparendo().pipe(map(response => {
    //   return this.resultadosTipado<RespuestaComparendoDto>(response);
    // }));


  }

}
