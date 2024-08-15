import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Offer} from "../../../models/offer";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../service/data.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgFor} from "@angular/common";

@Component({
  selector: 'app-update-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './update-offer.component.html',
  styleUrl: './update-offer.component.css'
})
export class UpdateOfferComponent implements OnInit{

  offer$!:Observable<Offer[]>;
  offerUpdateForm!:FormGroup;

  constructor(private router: Router, private data: DataService, private route:ActivatedRoute, private formBuilder: FormBuilder,) {
  }

  /**to recover one offer with data service and method get by id*/
  ngOnInit() {
    let offerId = +this.route.snapshot.params['id']
    this.offer$ = this.data.getOfferById(offerId);

    this.offerUpdateForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]],
      quantity:[null,[Validators.required]]

    })
  };

  onSubmitForm(){
    if(this.offerUpdateForm.invalid) {
      alert("La saisie de votre formulaire est incomplète!");
    } else {
      let offerId = +this.route.snapshot.params['id']
      let formValue = this.offerUpdateForm.value;
      this.data.putOffer(offerId, formValue);
      this.offerUpdateForm.reset();
      this.router.navigateByUrl('/adminpage');
    }
  }

}
