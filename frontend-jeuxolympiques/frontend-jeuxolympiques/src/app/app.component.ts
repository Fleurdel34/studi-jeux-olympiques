import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {ErrorComponent} from "./error/error.component";
import {LegalinformationComponent} from "./legalinformation/legalinformation.component";
import {ActivationComponent} from "./activation/activation.component";
import {ConnectionComponent} from "./connection/connection.component";
import {ProductpageComponent} from "./productpage/productpage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,
    RouterOutlet,
    FooterComponent,
    ErrorComponent,
    LegalinformationComponent,
    ActivationComponent,
    ConnectionComponent,
    ProductpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
