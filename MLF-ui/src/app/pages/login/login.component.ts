import {Component} from '@angular/core';
import {LoginRequest} from "../../services/models/login-request";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {TokenService} from "../../services/token/token.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {

  authRequest: LoginRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(private router: Router,
              private authService: AuthenticationControllerService,
              private tokenService: TokenService) {

  }

  login() {
    this.errorMsg = [];
    console.log('Starting login process...');

    this.authService.loginUser({
      body: this.authRequest
    }).subscribe({
      next: (responseBody) => {
        console.log('Received response...');
        console.log('Parsed Body:', responseBody);

        let token: string | undefined = responseBody?.token;

        if (token) {
          this.tokenService.token = token;
          console.log('Token found and stored.');
          this.router.navigate(['article']);
        } else {
          this.errorMsg.push('Token not found in response.');
          console.log('Token not found in response.');
        }
      },
      error: (err) => {
        console.error('Error response:', err);
        this.errorMsg = [
          err.error.businessErrorDescription ||
          err.error.error ||
          'An unexpected error occurred'
        ];
        console.log('Validation errors:', this.errorMsg);
      }
    });
  }


  register() {
    this.router.navigate(['register'])
  }
}
