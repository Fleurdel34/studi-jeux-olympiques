import { Component } from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {ProductpageComponent} from "./components/productpage/productpage.component";
import {ActivationComponent} from "./components/activation/activation.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {LegalinformationComponent} from "./components/legalinformation/legalinformation.component";
import {ErrorComponent} from "./components/error/error.component";
import {OffersComponent} from "./components/offers/offers.component";
import {AdminpageComponent} from "./components/adminpage/adminpage.component";

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
    ProductpageComponent,
    OffersComponent,
    AdminpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
