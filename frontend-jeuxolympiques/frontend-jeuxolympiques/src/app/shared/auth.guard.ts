
import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../service/auth.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    if(!this.authService.isLoggedIn()){
      window.alert("Accès refusé!");
      this.router.navigateByUrl('/connection')
    }
    return true;
  }
}
