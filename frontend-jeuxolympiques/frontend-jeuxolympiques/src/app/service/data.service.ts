import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, take} from "rxjs";
import {Offer} from "../models/offer";
import {FormGroup} from "@angular/forms";


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

   getOfferById(offerId:number): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.urlOffers}/${offerId}`);
  }

  createOffer(formValue: FormGroup) {
    this.http.post(this.urlOffers, formValue)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }

  PutOffer(offerId:number,formValue: FormGroup ) {
    this.http.put(`${this.urlOffers}/${offerId}`, formValue)}

  deleteOfferById(offerId:number): Observable<Offer>{
    return this.http.delete<Offer>(`${this.urlOffers}/${offerId}`);
  }


  getToken() {
    return localStorage.getItem('bearer');
  }
}
