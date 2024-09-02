import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatCalendarHeader} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {loadStripe} from "@stripe/stripe-js";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatCard,
    MatCalendarHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardHeader,
    NgOptimizedImage
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  /**to load Stripe*/
  stripePromise = loadStripe(environment.stripe);
  constructor(private http:HttpClient) {}

  /**to create a product object payment*/
  async pay(): Promise<void>{
    const payment={
      name:'e-ticket',
      currency:'eur',
      amount:22500,
      quantity:1,
      cancelUrl:'http://localhost:4200/cancel',
      successUrl:'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    /**to call http backend api*/
    this.http.post(`${environment.serverUrl}/payment`, payment)
      .subscribe((data:any)=>{
       stripe?.redirectToCheckout({
         sessionId:data.id,
       })
      })
  }

}
