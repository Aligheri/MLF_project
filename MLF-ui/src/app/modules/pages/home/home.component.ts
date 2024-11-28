import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
