
import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../service/auth.service";

/**implements guard for the security*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
  {
    if(!this.authService.getToken() && !this.authService.getRole()){
      window.alert("Accès refusé!");
      this.router.navigateByUrl('/connection');
      return false;
    }
    return true;
  }
}
