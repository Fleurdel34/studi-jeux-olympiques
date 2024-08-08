import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Observable} from "rxjs";
import {Offer} from '../../models/offer';
import {AsyncPipe, NgFor, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [AsyncPipe, NgFor, TitleCasePipe],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{

  offer$!:Observable<Offer[]>

  constructor( private data: DataService, private route: Router) {
  }

  /*to recover all offers with data service and method get all*/
  ngOnInit() {
    this.offer$ = this.data.getAllOffers();
  };

  onViewOffer(offerId: number){
    this.route.navigateByUrl(`single-offer/${offerId}`)
  }
}
