import {Component, OnInit} from '@angular/core';
import { DatePipe} from "@angular/common";



@Component({
  selector: 'app-saleadmin',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './saleadmin.component.html',
  styleUrl: './saleadmin.component.css'
})
export class SaleadminComponent implements OnInit{

  date!:Date;

  constructor() {
  }

  /*to recover all sales with data service*/
  ngOnInit() {
    this.date = new Date();

  }

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
