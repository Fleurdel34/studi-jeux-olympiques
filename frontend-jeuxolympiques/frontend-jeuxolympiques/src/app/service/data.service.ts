import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, take} from "rxjs";
import {Offer} from "../models/offer";
import {FormGroup} from "@angular/forms";
import {Payment} from "../models/payment";
import {environment} from "../../environments/environments";


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) {}

  /** Request get to recover all offers and one offer  in database*/

  getAllOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(`${environment.urlOffers}`)}

   getOfferById(offerId:number): Observable<Offer[]>{
    return this.http.get<Offer[]>(`${environment.urlOffers}/${offerId}`);
  }

  /**create a new offer with role Admin*/
  createOffer(formValue: FormGroup) {
    this.http.post(`${environment.urlOffers}`, formValue)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }

  putOffer(offerId:number, formValue: FormGroup) {
    this.http.put(`${environment.urlOffers}/${offerId}`, formValue).subscribe({
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
    return this.http.delete(`${environment.urlOffers}/${offerId}`).subscribe({
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
    this.http.post(`${environment.urlPayment}`, formValue).subscribe((res: any) => {
      localStorage.setItem('idKey', res);
    });
  }

  /**recover all transaction with request get for admin*/
  getAllPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${environment.urlPayment}`);
  }

  getIdKey(){
    return localStorage.getItem('idKey');
  }

  /**recover one transaction with request get for QrCode*/
  getPaymentById(paymentId:number): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${environment.urlPayment}/${paymentId}`);
  }


}
