import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  offerSolo!:number;
  offerDuo!:number
  offerFamilial!:number;


  constructor() {}

  setSaleOfferSolo(data:number){
  this.offerSolo = data;
  }

  setSaleOfferDuo(data:number){
    this.offerDuo = data;
  }

  setSaleOfferFamilial(data: number){
    this.offerFamilial= data;
  }

  getSaleOfferSolo(){
    return this.offerSolo;
  }

  getSaleOfferDuo(){
    return this.offerDuo;
  }

  getSaleOfferFamilial(){
    return this.offerFamilial;
  }
}
