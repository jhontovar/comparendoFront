import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }


  /**
  * Genera la concatenacion de una url
  * @param route
  * @param envAddress
  * @returns
  */
  protected createCompleteRoute = (route: string, api: string, method: string = ""): string => {
    if (method !== "") {
      return `${route}/${api}/${method}`;
    }
    return `${route}/${api}`;
  }

  protected resultadosTipado<T>(data: any): Respuesta<T> {
    let result: T = data['resultado'];
    let response: Respuesta<T> = {
      EsExitoso: data['esExitoso'],
      Mensaje: data['mensaje'],
      Resultado: result

    }
    return response;
  }
}

export interface Respuesta<X> {
  EsExitoso: boolean
  Mensaje: string
  Resultado: X
}


