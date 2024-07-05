import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountcreationComponent} from "./accountcreation/accountcreation.component";

export const routes: Routes = [
  {path:"registration", component:AccountcreationComponent},
  {path:'', component: HomeComponent}
];
