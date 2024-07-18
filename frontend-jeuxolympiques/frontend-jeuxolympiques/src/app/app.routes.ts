import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountcreationComponent} from "./accountcreation/accountcreation.component";
import {ErrorComponent} from "./error/error.component";
import {LegalinformationComponent} from "./legalinformation/legalinformation.component";
import {ActivationComponent} from "./activation/activation.component";

export const routes: Routes = [
  {path:"registration", component:AccountcreationComponent},
  {path:'', component: HomeComponent},
  {path:"legalinformation", component:LegalinformationComponent},
  {path:"activation", component:ActivationComponent},
  {path:"**", component:ErrorComponent},
];
