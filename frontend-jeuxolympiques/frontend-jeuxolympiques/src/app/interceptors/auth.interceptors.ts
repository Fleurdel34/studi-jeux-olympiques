
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

/**function interceptors to inject token and to redirect if token expired*/

export function authInterceptors (req: HttpRequest<unknown>, next: HttpHandlerFn){

    const token = inject(AuthService).getToken();
    const route = inject(Router);

    if (token !== null) {
      let reqClone = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)})
      return next(reqClone).pipe(
        catchError((error: HttpErrorResponse) => {
          localStorage.removeItem('bearer');
          localStorage.removeItem('id');
          route.navigateByUrl('connection');
          return throwError(()=>error) })
      );
    }
    return next(req);
}


