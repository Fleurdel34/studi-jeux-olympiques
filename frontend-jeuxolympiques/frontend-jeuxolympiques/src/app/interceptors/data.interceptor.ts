import{ Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler, HttpHeaders
} from "@angular/common/http";

import { Observable} from "rxjs";
import {DataService} from "../service/data.service";



@Injectable()
export class DataInterceptor implements HttpInterceptor{

  constructor(private dataService: DataService){}

  /** methode to inject token in request for authentication*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.dataService.getToken()}`)

    const modifiedRequest = req.clone({ headers })
    return next.handle(modifiedRequest);
  }

}
