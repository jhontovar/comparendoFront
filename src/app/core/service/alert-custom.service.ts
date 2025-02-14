import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertCustomService {
  constructor() {}

  /**
   *
   * @param message
   * @param type : primary, success, success, warning, info...
   */
  public showAlert(message: any, type: any): void {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
      const children = alertPlaceholder.children;
      while (children.length > 0) {
        alertPlaceholder.removeChild(children[0]);
      }

      const wrapper = document.createElement('div');
      wrapper.className = `alert alert-${type} alert-dismissible`;
      wrapper.setAttribute('role', 'alert');

      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      wrapper.appendChild(messageDiv);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn-close';
      button.setAttribute('data-bs-dismiss', 'alert');
      button.setAttribute('aria-label', 'Close');
      wrapper.appendChild(button);

      alertPlaceholder.appendChild(wrapper);
    }
  }

  /**
   *
   */
  public clearAlert() {
    try {
      const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
      alertPlaceholder?.replaceChildren();
    } catch (error) {}
  }
}
