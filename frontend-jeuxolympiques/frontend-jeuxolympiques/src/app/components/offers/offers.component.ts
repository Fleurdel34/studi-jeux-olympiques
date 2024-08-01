import {Component, OnInit} from '@angular/core';
import {AdminpageComponent} from "../adminpage/adminpage.component";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [AdminpageComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{
  title!:string;
  description!:string;
  price!:number;

  offerSolo = 0;
  offerDuo = 0;
  offerFamilial = 0;

  /*Use service to send data to admin page*/

  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {};

  /*add offers and remove offers*/
  addOfferSolo(){
    this.offerSolo++;
  }

  removeOfferSolo(){
    this.offerSolo--;
  }

  addOfferDuo(){
    this.offerDuo++;
  }

  removeOfferDuo(){
    this.offerDuo--;
  }

  addOfferFamilial(){
    this.offerFamilial++;
  }

  removeOfferFamilial(){
    this.offerFamilial--;
  }

  /*to send data offer to admin page and redirect to the login page to order*/

  onSubmit(){
    this.router.navigateByUrl("/connection");
    this.data.setSaleOfferSolo(this.offerSolo);
    this.data.setSaleOfferDuo(this.offerDuo);
    this.data.setSaleOfferFamilial(this.offerFamilial);
  }



}
