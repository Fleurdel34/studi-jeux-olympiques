import{ Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler
} from "@angular/common/http";

import { Observable} from "rxjs";
import {AuthService} from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  /** methode to inject token in request for authentication*/
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization:"Bearer " + token
      }
    });

    return next.handle(newCloneRequest);
  }

}
