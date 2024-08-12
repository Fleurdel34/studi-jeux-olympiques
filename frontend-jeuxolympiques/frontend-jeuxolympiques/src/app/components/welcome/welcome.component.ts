import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  user$!:Observable<User>;

  constructor(private auth: AuthService, private route:ActivatedRoute) {
  }

  /*to recover one user with data service and method get by id*/
  ngOnInit() {
    let userId = +this.route.snapshot.params['id']
    this.user$ = this.auth.getUserById(userId);
  };

  onSubmit(userRole:string){

  }
}
