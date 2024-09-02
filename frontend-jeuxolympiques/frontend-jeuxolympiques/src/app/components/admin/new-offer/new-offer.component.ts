import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {DataService} from "../../../service/data.service";

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.css'
})
export class NewOfferComponent implements OnInit{

  offerForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private data: DataService, private route:Router){}

  ngOnInit(){
    this.offerForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]],
      quantity:[null,[Validators.required]]

    })
  }

  /**send form values and create new offer in database*/
  onSubmitForm(){
    if(this.offerForm.invalid) {
      alert("La saisie de votre formulaire est incomplète!");
    } else {
      let formValue = this.offerForm.value;
      this.data.createOffer(formValue);
      this.route.navigateByUrl('/adminpage');
      window.alert("Rafraichissement de la page");
    }
  }

}
