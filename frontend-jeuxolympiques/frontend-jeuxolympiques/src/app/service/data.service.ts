import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {catchError, take} from "rxjs";
import {Sale} from "../models/sale";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient, private router: Router) {}

  createSale(sale:Sale) {
    this.http.post(this.url, sale)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }
  }
