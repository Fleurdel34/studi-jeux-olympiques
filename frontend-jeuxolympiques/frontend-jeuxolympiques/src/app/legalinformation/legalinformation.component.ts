import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-legalinformation',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './legalinformation.component.html',
  styleUrl: './legalinformation.component.css'
})
export class LegalinformationComponent {

}
