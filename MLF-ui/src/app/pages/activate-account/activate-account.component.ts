import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services";
import {CodeInputModule} from "angular-code-input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
  imports: [
    CodeInputModule,
    NgIf
  ],
  standalone: true
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;


  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }

  onCodeCompleted(token: string) {
  this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}
