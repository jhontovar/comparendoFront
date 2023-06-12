import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  /**
   *  Return request POST
   * @param url
   * @param obj
   * @returns
   */
  post<T>(url: string, obj: any): Observable<T> {
    return this.http.post<T>(url, (JSON.stringify(obj)),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) }
    );
  }


  /**
   * Return request GET
   * @param url
   * @param obj
   * @returns
   */
  get(url: string, obj: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(url
      , {
        headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }),
        params: obj || undefined
      }
    );
  }

}
