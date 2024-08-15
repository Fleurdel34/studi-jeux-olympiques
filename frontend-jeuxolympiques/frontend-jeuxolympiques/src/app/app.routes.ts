import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductpageComponent} from "./components/productpage/productpage.component";
import {AccountcreationComponent} from "./components/accountcreation/accountcreation.component";
import {ActivationComponent} from "./components/activation/activation.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {LegalinformationComponent} from "./components/legalinformation/legalinformation.component";
import {ErrorComponent} from "./components/error/error.component";
import {OffersComponent} from "./components/offers/offers.component";
import {AdminpageComponent} from "./components/admin/adminpage/adminpage.component";
import {SingleOfferComponent} from "./components/single-offer/single-offer.component";
import {SaleadminComponent} from "./components/admin/saleadmin/saleadmin.component";
import {NewOfferComponent} from "./components/admin/new-offer/new-offer.component";
import {AuthGuard} from "./guards/auth.guard";
import {PaymentComponent} from "./components/payment/payment.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {UpdateOfferComponent} from "./components/admin/update-offer/update-offer.component";


export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'productpage', component:ProductpageComponent},
  {path: 'offers', component: OffersComponent},
  {path:"single-offer/:id", component:SingleOfferComponent},

  {path: 'adminpage', component:AdminpageComponent, canActivate:[AuthGuard]},
  {path: 'new-offer', component:NewOfferComponent, canActivate:[AuthGuard]},
  {path: 'sales', component:SaleadminComponent, canActivate:[AuthGuard]},
  {path: 'update-offer/:id', component: UpdateOfferComponent, canActivate:[AuthGuard]},

  {path:"registration", component:AccountcreationComponent},
  {path:"activation", component:ActivationComponent},
  {path:"connection", component:ConnectionComponent},
  {path:"welcome/:id", component:WelcomeComponent, canActivate:[AuthGuard]},


  {path:"payment", component:PaymentComponent, canActivate:[AuthGuard]},

  {path:"legalinformation", component:LegalinformationComponent},

  {path:"**", component:ErrorComponent},
];
