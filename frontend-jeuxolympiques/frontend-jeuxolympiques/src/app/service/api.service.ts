import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Form, FormGroup} from "@angular/forms";
import {catchError, pipe, take} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:8080/api/users';

  urlActivation: string ='http://localhost:8080/api/users/activation';


  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Save a new form object in the Backend server data base
   * @param formValue
   */
  createUser(formValue: FormGroup){

    this.http.post(this.url,formValue)
      .pipe(take(1), catchError(err => { throw'error in source. Details: ' + err;}))
      .subscribe
      ({
        next: res => console.log(res),
        error : err => console.log(err)
      });
  }

  /**recover the token for authentication*/
  getToken() {
    return localStorage.getItem('loginToken');
  }

  activationAccount(formValue: FormGroup){

    this.http.post(this.urlActivation, formValue)
      .pipe(take(1), catchError(err => { throw'error in source. Details: ' + err;}))
      .subscribe
      ({
        next: res => console.log(res),
        error : err => console.log(err)
      });
  }
}
