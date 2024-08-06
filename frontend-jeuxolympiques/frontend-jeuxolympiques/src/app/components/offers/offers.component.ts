import {Component, OnInit} from '@angular/core';
import {AdminpageComponent} from "../adminpage/adminpage.component";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {Observable} from "rxjs";
import {Offer} from '../../models/offer';
import {AsyncPipe, NgFor, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [AdminpageComponent, FormsModule, ReactiveFormsModule, AsyncPipe, NgFor, TitleCasePipe],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{

  offer$!:Observable<Offer[]>

  constructor(private router: Router, private data: DataService) {
  }

  /*to recover all offers with data service and method get all*/
  ngOnInit() {
    this.offer$ = this.data.getAllOffers();
  };

  onSubmit(){
    this.router.navigateByUrl("/connection");
  }
}
