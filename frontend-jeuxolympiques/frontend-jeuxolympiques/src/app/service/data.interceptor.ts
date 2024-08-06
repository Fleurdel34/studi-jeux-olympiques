import{ Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpInterceptor,
  HttpEvent,
  HttpHandler
} from "@angular/common/http";

import { Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable()
export class DataInterceptor implements HttpInterceptor{
  constructor(private dataService: DataService){}

  /** methode to inject token in request for authentication*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.dataService.getToken();
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization:"Bearer " + token
      }
    });

    return next.handle(newCloneRequest);
  }

}
