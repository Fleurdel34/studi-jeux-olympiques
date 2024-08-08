import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgFor} from "@angular/common";
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-single-offer',
  standalone: true,
    imports: [
        AsyncPipe,
        NgFor
    ],
  templateUrl: './single-offer.component.html',
  styleUrl: './single-offer.component.css'
})
export class SingleOfferComponent implements OnInit{

  offer$!:Observable<Offer[]>;

  constructor(private router: Router, private data: DataService, private route:ActivatedRoute) {
  }

  /*to recover one offer with data service and method get by id*/
  ngOnInit() {
    let offerId = +this.route.snapshot.params['id']
    this.offer$ = this.data.getOfferById(offerId);
  };

  onSubmit(){
    this.router.navigateByUrl("/connection");
  }

  protected readonly Object = Object;
}
