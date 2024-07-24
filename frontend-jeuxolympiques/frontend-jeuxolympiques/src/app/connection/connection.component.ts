import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-connection',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent implements OnInit{

  connectionForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.connectionForm= this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    },{updateOn: 'blur'});
  }

  onSubmitForm(){
    let formValue = this.connectionForm.value;
    this.authService.connectionAccount(formValue);
    this.connectionForm.reset();
    this.router.navigateByUrl('/account');

  }

}
