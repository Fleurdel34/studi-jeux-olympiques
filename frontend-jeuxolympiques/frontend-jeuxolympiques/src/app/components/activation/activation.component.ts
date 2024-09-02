import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent implements OnInit {

  numberActivationForm!:FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,) {}


  ngOnInit() {
    this.numberActivationForm= this.formBuilder.group({
      code: [null, [Validators.required]],
    },{updateOn: 'blur'});
  }

  /**recover activation code form values and activated user in database*/
  onSubmitForm(){
      let formValue = this.numberActivationForm.value;
      this.apiService.activationAccount(formValue);
      this.numberActivationForm.reset();
  }

}




