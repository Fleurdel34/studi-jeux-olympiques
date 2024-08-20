import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {Offer} from "../../../models/offer";
import {DataService} from "../../../service/data.service";
import {Router} from "@angular/router";
import {Payment} from "../../../models/payment";



@Component({
  selector: 'app-saleadmin',
  standalone: true,
  imports: [DatePipe, AsyncPipe, NgForOf],
  templateUrl: './saleadmin.component.html',
  styleUrl: './saleadmin.component.css'
})
export class SaleadminComponent implements OnInit{

  date!:Date;
  payment$!:Observable<Payment[]>;
  sum:number =0;

  constructor(public data:DataService, private route:Router) {
  }


  /*to recover all sales with data service*/
  ngOnInit() {
    this.date = new Date();
    this.payment$ = this.data.getAllPayment();
  }

  addSaleOffer(data: number){
    let arrayOffer=[]
    arrayOffer.push(data);
    for(let i =0; i < arrayOffer.length; i++){
      this.sum += arrayOffer[i];
    }
    return this.sum;
  }

}
