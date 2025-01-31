import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../services/authentication-controller.service";
import {map} from "rxjs/operators";
import {MessageResponse} from "../models/message-response";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private authService: AuthenticationControllerService, private router: Router) {
  }


  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  get token() {
    return sessionStorage.getItem('token') as string;
  }

  isTokenValid(): Observable<boolean> {
    const token = this.token;
    if (!token) {
      console.error('⛔ No token found.');
      this.router.navigate(['/login']);
      return of(false);
    }

    const params = {body: token};

    return this.authService.validateToken(params).pipe(
      map((response: MessageResponse) => {
        console.log('Token validation response:', response);
        return response.message === 'Token is NOT expired';
      }),
      catchError((err) => {
        console.warn('Invalid or expired token:', err);
        sessionStorage.clear();
        return of(false);
      })
    );
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }
}
