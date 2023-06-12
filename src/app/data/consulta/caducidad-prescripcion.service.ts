import { Injectable } from '@angular/core';
import { URLSERVICIO } from 'src/app/core/constant/url-api.constant';
import { ApiRequestService } from 'src/app/core/service/api-request.service';
import { BaseService } from 'src/app/core/service/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaducidadPrescripcionService extends BaseService {

  constructor(private apiRequestService: ApiRequestService) {
    super();
  }

  /**
*
* @param model
* @returns
*/
  public Consultar(model: any) {
    return this.apiRequestService.post(this.createCompleteRoute(environment.apiDitra, URLSERVICIO.CaduPrescripcionConsultar), model);
  }
}
