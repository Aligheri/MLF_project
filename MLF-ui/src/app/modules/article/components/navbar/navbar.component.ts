import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthenticationControllerService} from "../../../../services/services/authentication-controller.service";
import {TokenService} from "../../../../services/token/token.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  token: string = '';

  constructor(private service: AuthenticationControllerService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.token = this.tokenService.token;
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout(token: string) {
    this.service.logout({Authorization: token}).subscribe({
      next: () => {
        sessionStorage.removeItem('token');
        window.location.reload();
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}
