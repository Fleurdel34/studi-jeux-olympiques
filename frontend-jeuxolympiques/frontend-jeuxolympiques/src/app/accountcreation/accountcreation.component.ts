import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-accountcreation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './accountcreation.component.html',
  styleUrl: './accountcreation.component.css'
})
export class AccountcreationComponent {
    userName!: string;
    userFirstname!: string;
    userEmail!:string;
    userTelephone!:number;
    userPassword!: string;
    userPasswordConfirmation!:string;

    /*recover all form values*/
    onSubmitForm(form: NgForm){
      console.log(form.value);
    }

}
