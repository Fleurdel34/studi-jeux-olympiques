import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";

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
  sumSolo:number =0;
  sumDuo: number=0;
  sumFamilial:number=0;

  constructor(public data:DataService, private route:Router) {
  }


  /**to recover all sales with data service*/
  ngOnInit() {
    this.date = new Date();
    this.data.getAllPayment().subscribe(
      {
        next: data =>{
          for(let index of data){
            if(index.nameTransaction === "Offre Solo"){
              this.addSaleOfferSolo(index.price)
            }else if(index.nameTransaction === "Offre Duo"){
              this.addSaleOfferDuo(index.price)
            }else if(index.nameTransaction === "Offre Familiale"){
              this.addSaleOfferFamilial(index.price)
            }
          }
        },
        error: err => {
          console.error("There is an error:", err);
        }
      }
    );

  }

  /**add the price for the sum by different offer*/

  addSaleOfferSolo(data: number){
    let arrayOffer=[]
    arrayOffer.push(data);
    for(let i =0; i < arrayOffer.length; i++){
      this.sumSolo += arrayOffer[i];
    }
    return this.sumSolo;
  }

  addSaleOfferDuo(data: number){
    let arrayOffer=[]
    arrayOffer.push(data);
    for(let i =0; i < arrayOffer.length; i++){
      this.sumDuo += arrayOffer[i];
    }
    return this.sumDuo;
  }

  addSaleOfferFamilial(data: number){
    let arrayOffer=[]
    arrayOffer.push(data);
    for(let i =0; i < arrayOffer.length; i++){
      this.sumFamilial += arrayOffer[i];
    }
    return this.sumFamilial;
  }

}
