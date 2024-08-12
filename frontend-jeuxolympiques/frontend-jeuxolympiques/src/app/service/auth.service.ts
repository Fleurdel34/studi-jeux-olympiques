import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../models/user";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlConnection: string ='http://localhost:8080/api/users/connection'


  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Request post with form object to authentication in data base
   * @param formValue
   */

  connectionAccount(formValue: FormGroup){
    this.http.post(this.urlConnection, formValue)
      .subscribe((res: any) => {
        localStorage.setItem('bearer', res.bearer);
        localStorage.setItem('id', res.id);
      });
  }


  getUserById(userId:number): Observable<User>{
    return this.http.get<User>(`${this.urlConnection}/${userId}`);
  }

  getId(){
    return localStorage.getItem('id');
  }


  /**recover the token for authentication*/
  getToken() {
    return localStorage.getItem('bearer');
  }

  /*delete token for disconnection*/
  logOut(){
    localStorage.removeItem('bearer');
    let token = localStorage.getItem('bearer');
    if (token == null) {
      this.router.navigate(['connection']);
    }
  }
}
