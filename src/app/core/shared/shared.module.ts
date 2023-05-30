import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastCustomComponent } from './toast-custom/toast-custom.component';

@NgModule({
  declarations: [
    ToastCustomComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ToastCustomComponent
  ]
})
export class SharedModule { }
