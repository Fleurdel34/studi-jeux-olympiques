import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {AsyncPipe, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf
  ],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent implements OnInit {

  offer$!:Observable<Offer>

  constructor(private router: Router, private data: DataService, private route:ActivatedRoute) {
  }

  /*to recover one offer with data service and method get by id*/
  ngOnInit() {
    const offerId = +this.route.snapshot.params['id']
    this.offer$ = this.data. getOfferById(offerId);
  };

  onSubmit(){
    this.router.navigateByUrl("/connection");
  }

}
