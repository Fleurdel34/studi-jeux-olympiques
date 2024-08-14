import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  user$!:Observable<User>;

  constructor(private router: Router, private auth: AuthService, private route:ActivatedRoute) {
  }

  /**to recover one user with data service and method get by id*/
  ngOnInit() {
    let userId = +this.route.snapshot.params['id']
    this.user$ = this.auth.getUserById(userId);
  };

  /**to recover role with data service to redirect with the correct path */
  onSubmit(userRole: Object){
    let role = userRole
    console.log(role)
    if( userRole === 'ADMIN'){
      this.router.navigateByUrl('adminpage');
    }else if ( userRole === 'USER'){
      this.router.navigateByUrl('payment');
    }
  }

}
