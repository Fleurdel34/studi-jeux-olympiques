import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { FormGroup} from "@angular/forms";
import {catchError, take} from "rxjs";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**Request post with form object to save in database*/

  createUser(formValue: FormGroup) {
    this.http.post(`${process.env["URL"]}`, formValue)
      .pipe(take(1), catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
      .subscribe();
  }

  activationAccount(formValue: FormGroup){
    this.http.post(`${process.env["URL_ACTIVATION"]}`, formValue, {observe: 'response'}).subscribe({
      next: (response) => {if(response.status===200){this.router.navigateByUrl("/connection")}},
      error: (err) => {alert("Votre code est invalide ou expiré")}
    });
  }

}
