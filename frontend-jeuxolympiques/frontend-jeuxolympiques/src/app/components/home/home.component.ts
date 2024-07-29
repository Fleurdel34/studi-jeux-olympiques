import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(protected router: Router) {
  }

  ngOnInit() {
  }

  /** Create method for redirect Product Page with route and path*/
  onClick(){
    this.router.navigateByUrl('/productpage');
  }

}
