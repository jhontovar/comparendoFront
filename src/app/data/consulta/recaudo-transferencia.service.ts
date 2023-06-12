import { Injectable } from '@angular/core';
import { URLSERVICIO } from 'src/app/core/constant/url-api.constant';
import { ApiRequestService } from 'src/app/core/service/api-request.service';
import { BaseService } from 'src/app/core/service/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecaudoTransferenciaService extends BaseService {

  constructor(private apiRequestService: ApiRequestService) {
    super();
  }

  /**
*
* @param model
* @returns
*/
  public ConsltarSeccional(model: any) {
    return this.apiRequestService.get(this.createCompleteRoute(environment.apiDitra, URLSERVICIO.RecaudoSeccionalConsltar), model);
  }

  /**
*
* @param model
* @returns
*/
  public ConsltarSecretaria(model: any) {
    return this.apiRequestService.get(this.createCompleteRoute(environment.apiDitra, URLSERVICIO.RecaudoSecretariaConsltar), model);
  }

  /**
*
* @param model
* @returns
*/
  public ConsltarRecaudo(model: any) {
    return this.apiRequestService.post(this.createCompleteRoute(environment.apiDitra, URLSERVICIO.RecaudoConsltarRecaudo), model);
  }
}
