import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest
} from "@angular/common/http";
import {catchError, pipe, throwError} from "rxjs";
import {inject} from "@angular/core";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";


export function dataInterceptors (req: HttpRequest<unknown>, next: HttpHandlerFn){

  const jwt = inject(DataService).getJwt();

  const route = inject(Router);

  if (jwt !== null) {
    let reqClone = req.clone({ headers: req.headers.set('Authorization', `Bearer ${jwt}`)})
    return next(reqClone).pipe(
      catchError((error: HttpErrorResponse) => {
        localStorage.removeItem('bearer');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        route.navigateByUrl('connection');
        return throwError(()=>error) })
    );
  }
  return next(req);

}
