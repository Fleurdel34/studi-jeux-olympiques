import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CancelComponent} from "./cancel/cancel.component";
import {SuccessComponent} from "./success/success.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CancelComponent,
    SuccessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stripe';

}
