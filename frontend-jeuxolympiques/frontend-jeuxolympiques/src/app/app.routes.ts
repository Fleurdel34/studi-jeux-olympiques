import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountcreationComponent} from "./accountcreation/accountcreation.component";

import {LegalinformationComponent} from "./legalinformation/legalinformation.component";
import {ActivationComponent} from "./activation/activation.component";
import {ConnectionComponent} from "./connection/connection.component";
import {ErrorComponent} from "./error/error.component";
import {ProductpageComponent} from "./productpage/productpage.component";

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'productpage', component:ProductpageComponent},

  {path:"registration", component:AccountcreationComponent},
  {path:"activation", component:ActivationComponent},
  {path:"connection", component:ConnectionComponent},

  {path:"legalinformation", component:LegalinformationComponent},

  {path:"**", component:ErrorComponent},
];
