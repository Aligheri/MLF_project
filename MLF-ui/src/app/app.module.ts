// src/app/app.module.ts

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS,  HttpClientModule} from '@angular/common/http';


import {routes} from './app.routes';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {CodeInputModule} from "angular-code-input";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {RouterModule} from "@angular/router";
@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CodeInputModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


