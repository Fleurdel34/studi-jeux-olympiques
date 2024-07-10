import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {confirmEqualValidator} from "../validators/confirmEqualValidator";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ApiService} from "../service/api.service";


@Component({
  selector: 'app-accountcreation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './accountcreation.component.html',
  styleUrl: './accountcreation.component.css'
})
export class AccountcreationComponent implements OnInit {

  registrationForm!: FormGroup;
  passwordRegex!: RegExp;
  userPasswordCtrl!: FormControl;
  userPasswordConfirmationCtrl!: FormControl;
  showPasswordError$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{10,}$/;

    this.userPasswordCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);
    this.userPasswordConfirmationCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);

    this.registrationForm = this.formBuilder.group({
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      mail: [null, [Validators.required, Validators.email]],
      password: this.userPasswordCtrl,
      userPasswordConfirmation: this.userPasswordConfirmationCtrl
    },{validators: [confirmEqualValidator('password', 'userPasswordConfirmation')], updateOn: 'blur'});

    this.initFormObservables();
  }

  /* Create Observable to write comment error*/
  private initFormObservables(){
    this.showPasswordError$ =this.registrationForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.userPasswordCtrl.value && this.userPasswordConfirmationCtrl.value)
    )
  }

  /*recover all form values*/
  /*  penser à clore l'observable + securisez les requetes token +
commentaire*/
  onSubmitForm(){
    if(this.registrationForm.invalid) {
      alert("La saisie de votre formulaire est erronée ou incomplète!");
    } else {
      let formValue = this.registrationForm.value;
      Reflect.deleteProperty(formValue, 'userPasswordConfirmation');
      this.apiService.createUser(formValue);
      this.registrationForm.reset();
    }
  }

}
