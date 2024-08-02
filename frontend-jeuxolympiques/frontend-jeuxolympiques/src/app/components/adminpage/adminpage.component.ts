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

  constructor(public data:DataService) {
  }


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
