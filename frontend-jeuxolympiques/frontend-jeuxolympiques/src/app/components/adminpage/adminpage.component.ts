import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent implements OnInit{
  /*properties offers*/
  title!:string;
  description!:string;
  price!:number;


  date!:Date;
  saleOfferSolo!:number;
  saleOfferDuo!:number;
  saleOfferFamilial!:number;

  totalSaleOfferSolo!:number;
  totalSaleOfferDuo!:number;
  totalSaleOfferFamilial!:number;

  protected readonly isNaN = isNaN;

  constructor(public data:DataService) {
  }

  /*Use service to recover data from offers page*/

  ngOnInit() {
    this.date = new Date();
    this.saleOfferSolo = this.data.getSaleOfferSolo();
    this.saleOfferDuo = this.data.getSaleOfferDuo();
    this.saleOfferFamilial = this.data.getSaleOfferFamilial();
    this.totalSaleOfferSolo = this.addSaleOffer(this.saleOfferSolo);
    this.totalSaleOfferDuo = this.addSaleOffer(this.saleOfferDuo);
    this.totalSaleOfferFamilial = this.addSaleOffer(this.saleOfferFamilial);
  }

  /*Create method and array to save sales data */
  addSaleOffer(data: number){
    let arrayOffer=[]
    let sum = 0;
    arrayOffer.push(data);
    for(let i =0; i < arrayOffer.length; i++){
      sum += arrayOffer[i];
    }
    return sum;
  }


}
