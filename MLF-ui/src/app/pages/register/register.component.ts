import {Component} from '@angular/core';
import {RegisterRequest} from "../../services/models/register-request";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf]
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }


  registerRequest: RegisterRequest = {
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
