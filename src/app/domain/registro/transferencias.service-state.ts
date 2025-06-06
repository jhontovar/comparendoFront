import { Injectable } from '@angular/core';
import { Transferencia } from '../interface/transferencia.interface';
import { BaseService, Respuesta } from 'src/app/core/service/base.service';
import { RegistroTransferenciasService } from '../../data/registro/registro-transferencias.service';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService extends BaseService {

  constructor(private transferenciasService: RegistroTransferenciasService) {
    super();
  }

  /**
*
* @param model
* @returns
*/
  public GuardarTransferencias(model: any) {
    return firstValueFrom(this.transferenciasService.GuardarTransferencia(model).pipe(map(response => {
      return this.resultadosTipado<Transferencia>(response);
    })));
  }

  /**
*
* @param model
* @returns
*/
public ConsultarTransferencias(model: any) {
  return firstValueFrom(this.transferenciasService.ConsultarTransferencia(model).pipe(map(response => {
    return this.resultadosTipado<Array<Transferencia>>(response);
  })));
}

  
}
