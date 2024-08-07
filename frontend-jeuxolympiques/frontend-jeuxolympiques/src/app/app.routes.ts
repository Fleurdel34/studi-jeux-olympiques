import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductpageComponent} from "./components/productpage/productpage.component";
import {AccountcreationComponent} from "./components/accountcreation/accountcreation.component";
import {ActivationComponent} from "./components/activation/activation.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {LegalinformationComponent} from "./components/legalinformation/legalinformation.component";
import {ErrorComponent} from "./components/error/error.component";
import {OffersComponent} from "./components/offers/offers.component";
import {AdminpageComponent} from "./components/adminpage/adminpage.component";
import {CartpageComponent} from "./components/cartpage/cartpage.component";


export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'productpage', component:ProductpageComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'adminpage', component:AdminpageComponent},

  {path:"registration", component:AccountcreationComponent},
  {path:"activation", component:ActivationComponent},
  {path:"connection", component:ConnectionComponent},
  {path:"cartpage/:id", component:CartpageComponent},

  {path:"legalinformation", component:LegalinformationComponent},

  {path:"**", component:ErrorComponent},
];
