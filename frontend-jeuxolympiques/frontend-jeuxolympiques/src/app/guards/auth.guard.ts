import {inject} from "@angular/core";

import {
  Router,
} from "@angular/router";
import { AuthService } from "../service/auth.service";

/**implements guard for the security*/

export const AuthGuard = ()=>{

  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.authenticated()) {
      window.alert("Accès refusé!");
      router.navigateByUrl('/connection');
      return false;
    }
    return true;
}
