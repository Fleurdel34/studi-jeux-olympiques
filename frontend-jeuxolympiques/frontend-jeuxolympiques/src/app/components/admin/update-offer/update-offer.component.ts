import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Offer} from "../../../models/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../service/data.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-update-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-offer.component.html',
  styleUrl: './update-offer.component.css'
})
export class UpdateOfferComponent implements OnInit{

  offer$!:Observable<Offer[]>;
  offerForm!:FormGroup;

  constructor(private router: Router, private data: DataService, private route:ActivatedRoute, private formBuilder: FormBuilder,) {
  }

  /**to recover one offer with data service and method get by id*/
  ngOnInit() {
    let offerId = +this.route.snapshot.params['id']
    this.offer$ = this.data.getOfferById(offerId);
  };

  onSubmitForm(offerId:number){
    if(this.offerForm.invalid) {
      alert("La saisie de votre formulaire est incomplète!");
    } else {
      let formValue = this.offerForm.value;
      this.data.putOffer(offerId, formValue);
      this.offerForm.reset();
      this.router.navigateByUrl('/adminpage');
    }
  }

}
