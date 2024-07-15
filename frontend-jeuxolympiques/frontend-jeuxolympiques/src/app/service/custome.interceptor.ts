import{ Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler
} from "@angular/common/http";

import { Observable} from "rxjs";
import {ApiService} from "./api.service";

@Injectable()
export class CustomeInterceptor implements HttpInterceptor{
  constructor(private apiService: ApiService){}

  /** methode to inject token in request for authentication*/
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.apiService.getToken();
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization:"Bearer " + token
      }
    })

    return next.handle(newCloneRequest);
  }
}
