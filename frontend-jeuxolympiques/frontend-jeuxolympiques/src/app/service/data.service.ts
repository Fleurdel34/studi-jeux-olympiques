import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, take} from "rxjs";
import {Offer} from "../models/offer";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlOffers: string = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient, private router: Router) {}

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

  putOffer(offerId:number,formValue: FormGroup ) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('bearer')}`)
    this.http.put(`${this.urlOffers}/${offerId}`, formValue)}

  deleteOfferById(offerId:number): Observable<Offer>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('bearer')}`)
    return this.http.delete<Offer>(`${this.urlOffers}/${offerId}`);
  }

  /**recover the token for authentication*/
  getJwt() {
    return localStorage.getItem('bearer');
  }

  /**delete token for disconnection*/
  clearJwtExpired(){
    localStorage.removeItem('bearer');
    localStorage.removeItem('id');
    let token = localStorage.getItem('bearer');
    if (token === null) {
      this.router.navigateByUrl('/connection');
    }
  }

}
