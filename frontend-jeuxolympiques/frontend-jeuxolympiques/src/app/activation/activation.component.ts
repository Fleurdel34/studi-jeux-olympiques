import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent implements OnInit {

  numberActivationForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.numberActivationForm= this.formBuilder.group({
      code: [null, [Validators.required]],
    },{updateOn: 'blur'});
  }

  onSubmitForm(){
      let formValue = this.numberActivationForm.value;
      this.apiService.activationAccount(formValue);
      this.numberActivationForm.reset();
      this.router.navigateByUrl('/connection');

  }
}
