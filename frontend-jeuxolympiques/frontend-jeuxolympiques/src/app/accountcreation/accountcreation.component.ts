import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl, FormControlOptions,
  FormControlState,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {confirmEqualValidator} from "../validators/confirmEqualValidator";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-accountcreation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './accountcreation.component.html',
  styleUrl: './accountcreation.component.css'
})
export class AccountcreationComponent implements OnInit {

  registrationForm!: FormGroup;
  passwordRegex!: RegExp;

  userPasswordCtrl!: FormControl;
  userPasswordConfirmationCtrl!: FormControl;


  showPasswordError$!: Observable<boolean>

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{10,}$/;

    this.userPasswordCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);
    this.userPasswordConfirmationCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);

    this.registrationForm = this.formBuilder.group({
      userLastname: [null, [Validators.required]],
      userFirstname: [null, [Validators.required]],
      userEmail: [null, [Validators.required, Validators.email]],
      userTelephone: [null, [Validators.required]],
      userPassword: this.userPasswordCtrl,
      userPasswordConfirmation: this.userPasswordConfirmationCtrl
    },{validators: [confirmEqualValidator('userPassword', 'userPasswordConfirmation')], updateOn: 'blur'});

    this.initFormObservables();
  }

  /* Create Observable to write comment error*/

  private initFormObservables(){
    this.showPasswordError$ =this.registrationForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.userPasswordCtrl.value && this.userPasswordConfirmationCtrl.value)
    )
  }

  /*recover all form values*/
    onSubmitForm(){
      if (this.registrationForm.invalid) {
        alert("La saisie de votre formulaire est erronée ou incomplète!");
      } else {

        let formValue= this.registrationForm.value;
        console.log(formValue);
        this.registrationForm.reset();
      }
    }

}
