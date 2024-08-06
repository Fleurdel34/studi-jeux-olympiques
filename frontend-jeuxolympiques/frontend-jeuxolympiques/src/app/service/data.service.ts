import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, take} from "rxjs";
import {Sale} from "../models/sale";
import {Offer} from "../models/offer";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:8080/api/sales';

  urlOffers: string = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient, private router: Router) {}

  createSale(sale:Sale) {
    this.http.post(this.url, sale)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }

  getAllOffers():Observable<Offer[]>{
    return this.http.get<Offer[]>(this.urlOffers)}

  getToken() {
    return localStorage.getItem('bearer');
  }
  }
