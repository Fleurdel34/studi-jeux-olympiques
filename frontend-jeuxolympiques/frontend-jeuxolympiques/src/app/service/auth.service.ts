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


  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Request post with form object to authentication in database*/
  connectionAccount(formValue: FormGroup){
    this.http.post(`${process.env["URL_CONNECTION"]}`, formValue)
      .subscribe((res: any) => {
        localStorage.setItem('bearer', res.bearer);
        localStorage.setItem('id', res.id);
        localStorage.setItem('role', res.role);
      });
  }


  /**Request get with to recover one user id in database*/
  getUserById(userId:number): Observable<User>{
   return this.http.get<User>(`${process.env["URL"]}/${userId}`);
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

  /**update password with request put*/
  putUserById(userId:number, formValue: FormGroup) {
    this.http.put(`${process.env["URL"]}/${userId}`, formValue).subscribe({
      next: res => {
        console.log('Update successful');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  deleteUserById(userId:number){
    return this.http.delete(`${process.env["URL"]}/${userId}`).subscribe({
      next: res => {
        console.log('Delete successful');
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
