import { Component } from '@angular/core';
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {CodeInputModule} from "angular-code-input";
import { HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./modules/article/components/navbar/navbar.component";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";


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
    CommonModule,
    MatListModule,
    ActivateAccountComponent,
    RouterModule,
    NavbarComponent,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'MLF-ui';
}
