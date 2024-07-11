import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Router} from "@angular/router";



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


  constructor(protected router: Router) {
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

}
