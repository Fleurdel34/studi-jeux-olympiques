import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {AccueilComponent} from "./accueil/accueil.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AccueilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
