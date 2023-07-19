import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout/layout.component';
import { HttpAuthorizationService } from './core/interceptor/http-authorization.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HomeComponent } from './layout/home/home.component';


export const httpInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpAuthorizationService, multi: true },
  { provide: LocationStrategy, useClass: HashLocationStrategy}
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule
  ],
  providers: [httpInterceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
