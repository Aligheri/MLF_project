import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
