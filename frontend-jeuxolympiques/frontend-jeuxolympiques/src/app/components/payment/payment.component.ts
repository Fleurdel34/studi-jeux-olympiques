import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataService} from "../../service/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {minDateValidator} from "../../validators/date.validator";
import {Observable} from "rxjs";
import {Offer} from "../../models/offer";
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  paymentForm!:FormGroup;
  offer$!:Observable<Offer[]>;

  constructor(private formBuilder: FormBuilder, private data: DataService, private route:Router,  private router:ActivatedRoute){}


  /*to recover one offer with data service and method get by id*/

  ngOnInit(){

    this.paymentForm = this.formBuilder.group({
      holder:[null,[Validators.required]],
      accountNumber:[null,[Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      date:[null,[Validators.required, minDateValidator()]],
      code:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
    let offerId = localStorage.getItem("offerId");
    let idOffer= Number(offerId);
    this.offer$ = this.data.getOfferById(idOffer);
  }

  /** to input data form and to select offer, to send at the database*/

  onSubmitForm(offerName:string, offerPrice:number) {
    if (this.paymentForm.invalid) {
      alert("La saisie de votre formulaire est incomplète ou erronée!");
    } else {
      let formValue = this.paymentForm.value;
      formValue.nameTransaction = offerName;
      formValue.price = offerPrice;
      console.log(formValue);
      this.data.createPayment(formValue);
      this.paymentForm.reset();
      localStorage.removeItem("offerId");
      this.route.navigateByUrl("pageQrCode");
    }
  }

  onChangeOrDelete(){
    this.route.navigateByUrl("/informationAccount")
  }

}
