import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void{}

  /* Create method for redirect Account Creation Page with route and path*/
  onRedirectAccountCreation(): void{
      this.router.navigateByUrl('/registration');
  }

}
