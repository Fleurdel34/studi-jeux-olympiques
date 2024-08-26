import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, take} from "rxjs";
import {Offer} from "../models/offer";
import {FormGroup} from "@angular/forms";
import {Payment} from "../models/payment";
import 'dotenv/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  urlOffers: string = 'http://localhost:8080/api/offers';
  urlPayment: string = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

  /**
   * Request get to recover all offers and one offer  in database
   * @return an array
   */

  getAllOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(this.urlOffers)}

   getOfferById(offerId:number): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${this.urlOffers}/${offerId}`);
  }

  /**create a new offer with role Admin*/
  createOffer(formValue: FormGroup) {
    this.http.post(this.urlOffers, formValue)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }

  putOffer(offerId:number, formValue: FormGroup) {
    this.http.put(`${this.urlOffers}/${offerId}`, formValue).subscribe({
      next: res => {
        console.log('Update successful');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**delete an offer with role Admin and with id offer*/

  deleteOfferById(offerId:number){
    return this.http.delete(`${this.urlOffers}/${offerId}`).subscribe({
      next: res => {
        console.log('Delete successful');
      },
        error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  /**recover the token for authentication*/
  getJwt() {
    return localStorage.getItem('bearer');
  }


  /**create a new transaction with request post*/
  createPayment(formValue: FormGroup) {
    this.http.post(this.urlPayment, formValue).subscribe((res: any) => {
      localStorage.setItem('idKey', res);
    });
  }

  /**recover all transaction with request get for admin*/
  getAllPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(this.urlPayment);
  }

  getIdKey(){
    return localStorage.getItem('idKey');
  }

  /**recover one transaction with request get for QrCode*/
  getPaymentById(paymentId:number): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.urlPayment}/${paymentId}`);
  }


}
