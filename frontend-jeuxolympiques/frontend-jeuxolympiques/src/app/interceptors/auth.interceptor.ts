import{ Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler, HttpHeaders
} from "@angular/common/http";

import { Observable} from "rxjs";
import {AuthService} from "../service/auth.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  /** methode to inject token in request for authentication*/
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   const headers = new HttpHeaders()
     .append('Authorization', `Bearer ${this.authService.getToken()}`)

   const modifiedRequest = req.clone({ headers })
    return next.handle(modifiedRequest);
    }
}
