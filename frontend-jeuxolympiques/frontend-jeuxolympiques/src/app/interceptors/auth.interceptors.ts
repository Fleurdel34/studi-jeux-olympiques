
import {
HttpHandlerFn,
HttpRequest
} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";


export function authInterceptors (req: HttpRequest<unknown>, next: HttpHandlerFn){

    const token = inject(AuthService).getToken();
    if (token !== null) {
      let reqClone = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)})
      return next(reqClone).pipe(
        catchError((err) => {
          if (err.status === 403){
            inject(AuthService).logOut();
          }
          return throwError(()=> err('Session expiré'))
        })
      )
    }
    return next(req);

}


