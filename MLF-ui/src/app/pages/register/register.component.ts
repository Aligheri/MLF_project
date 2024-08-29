import { Component } from '@angular/core';
import {RegisterRequest} from "../../services/models/register-request";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }


  registerRequest : RegisterRequest = {
    email: '',
    password: '',
    username: '',
    role: ['User']
  }
  errorMsg: Array<string> = [];


  register() {
    this.errorMsg = [];
    this.authService.registerUser({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.error('Error response:', err);
          this.errorMsg = err.error.validationErrors;
          console.log('Validation errors:', this.errorMsg);
        }
      });
  }

  login() {
    this.router.navigate(['login']);
  }
}
