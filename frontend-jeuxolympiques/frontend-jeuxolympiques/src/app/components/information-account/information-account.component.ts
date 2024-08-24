import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {confirmEqualValidator} from "../../validators/confirmEqualValidator";
import {Observable} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-information-account',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './information-account.component.html',
  styleUrl: './information-account.component.css'
})
export class InformationAccountComponent implements OnInit{

  user$!:Observable<User>;
  passwordForm!:FormGroup;
  passwordRegex!: RegExp;
  userPasswordCtrl!: FormControl;
  userPasswordConfirmationCtrl!: FormControl;
  showPasswordError$!: Observable<boolean>;

  constructor(private auth:AuthService, private route:Router, private formBuilder: FormBuilder,) {
  }

  /**to recover one user with data service and method get by id and put by id to update password*/
  ngOnInit() {

    let id = localStorage.getItem('id');
    let userId= Number(id);
    this.user$ = this.auth.getUserById(userId);

    this.passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{10,}$/;

    this.userPasswordCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);
    this.userPasswordConfirmationCtrl =this.formBuilder.control('', [Validators.required, Validators.pattern(this.passwordRegex)]);

    this.passwordForm = this.formBuilder.group({
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      mail: [null, [Validators.required]],
      password: this.userPasswordCtrl,
      userPasswordConfirmation: this.userPasswordConfirmationCtrl,
    },{validators: [confirmEqualValidator('password', 'userPasswordConfirmation')], updateOn: 'blur'});
  }

  onSubmitForm(){
    if(this.passwordForm.invalid){
      alert("La saisie de votre mot de passe est erroné!");
    } else{
      let id = localStorage.getItem('id');
      let userId= Number(id);
      let formValue = this.passwordForm.value;
      this.auth.putUserById(userId, formValue);
      this.route.navigateByUrl('/connection');
    }
  }


}
