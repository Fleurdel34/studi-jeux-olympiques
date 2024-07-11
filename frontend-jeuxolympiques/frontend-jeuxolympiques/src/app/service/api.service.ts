import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {take} from "rxjs";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Save a new form object in the Backend server data base
   * @param formValue
   */
  createUser(formValue: FormGroup){

    this.http.post(this.url,formValue)
      .pipe(take(1))
      .subscribe
      (
        (res:any) => {
          if (res.result) {
            alert('login Success');
            localStorage.setItem('loginToken', res.data.token);
            this.router.navigateByUrl('/confirmationcode');
          } else {
            res.messageerror;
            alert('login failed')
          }

        });
  }

  /**recover the token for authentication*/
  getToken() {
    return localStorage.getItem('loginToken');
  }

}
