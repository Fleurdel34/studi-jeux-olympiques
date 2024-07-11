import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { confirmEqualValidator } from "../validators/confirmEqualValidator";
import { map, Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { ApiService } from "../service/api.service";
// @ts-ignore
import * as bcrypt from "bcryptjs";



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
  hashedPassword: any;

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

  /*recover all form values and create user in data base
  */
  /*
  securisez les requetes ac token+ : jwt token
  sécuriser l'API avec l'authentification user + mot de passe et tocken +role
  * si l'utilisateur existe déjà*/

  onSubmitForm(){

    if(this.registrationForm.invalid) {

      alert("La saisie de votre formulaire est erronée ou incomplète!");

    } else {

      let formValue = this.registrationForm.value;
      Reflect.deleteProperty(formValue, 'userPasswordConfirmation');
      formValue.password = this.hashPassword(formValue.password);
      this.apiService.createUser(formValue);
      this.registrationForm.reset();

    }
  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
   this.hashedPassword = bcrypt.hashSync(password, salt);
    return this.hashedPassword;
  }



}
