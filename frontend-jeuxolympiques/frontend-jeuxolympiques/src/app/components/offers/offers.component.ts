import {Component, OnInit} from '@angular/core';
import {AdminpageComponent} from "../adminpage/adminpage.component";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {Sale} from "../../models/sale";

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [AdminpageComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{

  title!:string;
  description!:string;
  price!:number;

  sale!:Sale;


  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.addNameOffer();
  };

  /*add and remove quantity offers*/
  addSale(){
    this.sale.quantity++;
  }

  removeSale(){
    this.sale.quantity--;
  }

  /*add name offers*/
  addNameOffer(){
    this.sale.nameOffer = this.title;
  }


  onSubmit(){
    this.router.navigateByUrl("/connection");
    this.data.createSale(this.sale)
  }



}
