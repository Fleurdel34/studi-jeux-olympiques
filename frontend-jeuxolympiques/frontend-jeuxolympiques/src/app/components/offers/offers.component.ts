import {Component, OnInit} from '@angular/core';
import {AdminpageComponent} from "../adminpage/adminpage.component";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {Sale} from "../../models/sale";
import {Observable} from "rxjs";
import { Offer } from '../../models/offer';
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
  sale!:Sale;

  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.offer$ = this.data.getAllOffers();
  };

  /*add and remove quantity offers*/
  addSale(){
    this.sale.quantity++;
  }

  removeSale(){
    this.sale.quantity--;
  }

  onSubmit(){
    this.router.navigateByUrl("/connection");
    this.data.createSale(this.sale)
  }

 }
