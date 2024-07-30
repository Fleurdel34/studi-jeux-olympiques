import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlConnection: string ='http://localhost:8080/api/users/connection'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Request post with form object to authentication in data base
   * @param formValue
   */

  connectionAccount(formValue: FormGroup){
    this.http.post(this.urlConnection, formValue)
      .subscribe((res: any) => {
        localStorage.setItem('bearer', res.token);
      });
  }

  /**recover the token for authentication*/
  getToken() {
    return localStorage.getItem('bearer');
  }

   isLoggedIn(): boolean {
    let authToken = localStorage.getItem('bearer');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('bearer');
    if (removeToken == null) {
      this.router.navigate(['connection']);
    }
  }

  getUserProfile(id: any): Observable<any> {
    let api = `${this.urlConnection}/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => msg);
  }

  public logout(){
    localStorage.removeItem('access_token');
  }

}
