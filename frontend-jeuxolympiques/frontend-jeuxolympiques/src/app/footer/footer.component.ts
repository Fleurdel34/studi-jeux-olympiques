import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit() {
  }

  /** Create method for redirect Legal Information Page with route and path*/

  onRedirectLegalInformation(): void{
    this.router.navigateByUrl('/legalinformation');
  }

}
