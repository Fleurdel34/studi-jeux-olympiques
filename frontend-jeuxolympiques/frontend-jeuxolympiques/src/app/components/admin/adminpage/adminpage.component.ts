import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../service/data.service";
import {AsyncPipe, NgFor, TitleCasePipe} from "@angular/common";
import {Observable} from "rxjs";
import {Offer} from "../../../models/offer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [AsyncPipe, NgFor, TitleCasePipe],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent implements OnInit{

  offer$!:Observable<Offer[]>

  constructor(public data:DataService, private route:Router) {
  }

  /**to recover all offers with data service*/
  ngOnInit() {
    this.offer$ = this.data.getAllOffers();

  }

  /**to see the sales by offer*/
  viewSales(){
    this.route.navigateByUrl("/sales");
  }

  /**to create new offer*/
  addNewOffer(){
    this.route.navigateByUrl("/new-offer");
  }

  /**to update one offer*/
  updateOffer(offerId: number) {
    this.route.navigateByUrl(`update-offer/${offerId}`)
  }

  /**to delete one offer*/
  deleteOffer(offerId: number) {
    if(window.confirm("Etes vous sûr de vouloir supprimer, l'offre!, " +
      "Si oui, vous allez être redirigé pour créer une nouvelle offre")){
      this.data.deleteOfferById(offerId);
      this.route.navigateByUrl("/new-offer")
    }else{
      this.route.navigateByUrl('/adminpage')
    }
  }
}
