import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-toast-custom',
  templateUrl: './toast-custom.component.html',
  styleUrls: ['./toast-custom.component.scss']
})
export class ToastCustomComponent implements OnInit, OnChanges {

  @Input() params: any = {method:"",message:""};
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.params?.method && this.params?.message) {
      this.showToast();
    }
  }

  showToast() {
    const toastLive = document.getElementById('liveToast');
    const toast = new window.bootstrap.Toast(toastLive)
    toast.show();

    toastLive?.addEventListener('hidden.bs.toast', () => {
      // do something...
    })
  }

}
