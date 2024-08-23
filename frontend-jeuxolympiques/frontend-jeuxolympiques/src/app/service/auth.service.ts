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

  urlUser: string ='http://localhost:8080/api/users'

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Request post with form object to authentication in database
   * @param formValue
   */
  connectionAccount(formValue: FormGroup){
    this.http.post(this.urlConnection, formValue)
      .subscribe((res: any) => {
        localStorage.setItem('bearer', res.bearer);
        localStorage.setItem('id', res.id);
        localStorage.setItem('role', res.role);
      });
  }


  /**
   * Request get with to recover one user id in data base
   * @param userId
   */
  getUserById(userId:number): Observable<User>{
   return this.http.get<User>(`${this.urlUser}/${userId}`);
  }

  /**recover id user authenticated*/
  getId(){
    return localStorage.getItem('id');
  }

  /**recover the token for authentication*/
  getToken() {
    return localStorage.getItem('bearer');
  }

  /**recover the token for authentication*/
  getRole() {
    return localStorage.getItem('role');
  }


  /**delete token for disconnection*/
  logOut(){
    localStorage.removeItem('bearer');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('offerId');
    localStorage.removeItem('idKey');
    let token = localStorage.getItem('bearer');
    if (token === null) {
      this.router.navigateByUrl('/connection');
    }
  }
}
