import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {User} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{

  user$!:Observable<User[]>;

  constructor(private router: Router, private auth: AuthService, private route:ActivatedRoute) {
  }

  /*to recover one user with data service and method get by id*/
  ngOnInit() {
    let userId = +this.route.snapshot.params['id'];
    this.user$ = this.auth.getUserById(userId);
  };

  onSubmit(userRole:string){
    if(userRole === 'ADMIN'){
      this.router.navigateByUrl("/adminpage");
    }else if(userRole === 'USER') {
      this.router.navigateByUrl("/payment");
    }else{
      window.alert("Accès refusé");
      this.router.navigateByUrl("");
    }


  }

}
