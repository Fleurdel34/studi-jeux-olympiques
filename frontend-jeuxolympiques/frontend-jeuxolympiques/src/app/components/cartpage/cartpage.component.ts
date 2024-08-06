import {Component, OnInit} from '@angular/core';
import {async, Observable} from "rxjs";
import {Offer} from "../../models/offer";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {AsyncPipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent implements OnInit {

  offer$!:Observable<Offer>

  constructor(private router: Router, private data: DataService, private route:ActivatedRoute) {
  }

  /*to recover all offers with data service and method get all*/
  ngOnInit() {
    const offerId = +this.route.snapshot.params['id']
    this.offer$ = this.data. getOfferById(offerId);
  };

  onSubmit(){
    this.router.navigateByUrl("/connection");
  }

  protected readonly async = async;
}
