import { Component } from '@angular/core';
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {CodeInputModule} from "angular-code-input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'MLF-ui';
}
