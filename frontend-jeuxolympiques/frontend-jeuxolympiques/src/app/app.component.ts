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
import {SingleOfferComponent} from "./components/single-offer/single-offer.component";
import {AdminpageComponent} from "./components/admin/adminpage/adminpage.component";
import {SaleAdminComponent} from "./components/admin/saleadmin/saleadmin.component";
import {NewOfferComponent} from "./components/admin/new-offer/new-offer.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {UpdateOfferComponent} from "./components/admin/update-offer/update-offer.component";
import {QrcodeComponent} from "./components/qrcode/qrcode.component";
import {InformationAccountComponent} from "./components/information-account/information-account.component";


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
    AdminpageComponent,
    SingleOfferComponent,
    SaleAdminComponent,
    NewOfferComponent,
    PaymentComponent,
    WelcomeComponent,
    UpdateOfferComponent,
    QrcodeComponent,
    InformationAccountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
