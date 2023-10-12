import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertCustomService {

  constructor() { }

  /**
   * 
   * @param message 
   * @param type : primary, success, success, warning, info...
   */
  public showAlert(message: any, type: any): void {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
      alertPlaceholder.innerHTML = "";
      const alert = (message: any, type: any) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')

        alertPlaceholder?.append(wrapper)
      }
      alert(message, type);
    }
  }

  /**
   * 
   */
  public clearAlert(){
    try {
      const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
      alertPlaceholder?.replaceChildren();
    } catch (error) {
      
    }
    
  }

}
