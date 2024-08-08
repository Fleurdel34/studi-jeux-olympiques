import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offer} from "../models/offer";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlOffers: string = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient) {}

  /**
   * Request get to recover all offers and one offer  in data base
   * @return an array
   */

  getAllOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(this.urlOffers)}

  getToken() {
    return localStorage.getItem('bearer');
  }

  getOfferById(offerId:number): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.urlOffers}/${offerId}`);
  }
}
