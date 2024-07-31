import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent implements OnInit{

  constructor(protected router: Router) {
  }

  ngOnInit() {
  }

  /** Create method for redirect Product Page with route and path*/
  onClick(){
    this.router.navigateByUrl('/offers');
  }
}
