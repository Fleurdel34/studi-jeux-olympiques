import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountcreationComponent} from "./accountcreation/accountcreation.component";

export const routes: Routes = [
  {path:"Inscription", component:AccountcreationComponent},
  {path:'', component: HomeComponent}
];
