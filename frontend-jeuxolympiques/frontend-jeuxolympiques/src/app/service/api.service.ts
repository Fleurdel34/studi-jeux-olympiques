import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {FormGroup} from "@angular/forms";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient) {
  }

  /**
   * Save a new form object in the Backend server data base
   * @param formValue
   */
  createUser(formValue: FormGroup){

    this.http.post(this.url,formValue)
      .subscribe
      (
        (res) =>{console.log(res)}
      );
  }

}
