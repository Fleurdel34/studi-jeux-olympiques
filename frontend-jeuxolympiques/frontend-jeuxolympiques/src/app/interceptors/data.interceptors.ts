import {
  HttpHandlerFn,
  HttpRequest
} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {DataService} from "../service/data.service";


export function dataInterceptors (req: HttpRequest<unknown>, next: HttpHandlerFn){

  const jwt = inject(DataService).getJwt();
  if (jwt !== null) {
    let reqClone = req.clone({ headers: req.headers.set('Authorization', `Bearer ${jwt}`)})
    return next(reqClone).pipe(
      catchError((err) => {
        if (err.status === 403){
          inject(DataService).clearJwtExpired();
        }
        return throwError(()=> err('Session expiré'))
      })
    )
  }
  return next(req);

}
