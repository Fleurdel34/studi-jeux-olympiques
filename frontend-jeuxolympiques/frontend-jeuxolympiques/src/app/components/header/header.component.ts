import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  showMe: boolean=true;
  hideMe: boolean=false;

  constructor(protected router: Router, private auth:AuthService) {
  }

  ngOnInit(): void {
  }

  /** Create method for redirect Account Creation Page with route and path*/
  onRedirectAccountCreation(): void {
    this.router.navigateByUrl('/registration');
  }

  /** Create method for redirect Home Page if page isn't Home*/
  onRedirectBackHomePage(): void {
    this.router.navigateByUrl('/');
  }

  onRedirectConnectionPage(): void {
    this.router.navigateByUrl('/connection');
  }

  /**Create method to modify login logout menu*/
  buttonShowHide(){
   this.showMe =! this.showMe;
   this.hideMe =!this.hideMe;
  }

  doLogOut(){
    this.auth.logOut();
  }

   changeAndDelete(){

   }
}
