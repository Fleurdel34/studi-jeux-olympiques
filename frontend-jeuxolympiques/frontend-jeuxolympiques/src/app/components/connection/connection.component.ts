import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";



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

  /**to recover id user and authentication with auth service and method post and get*/
  onLogin(){
    let formValue = this.connectionForm.value;
    this.authService.connectionAccount(formValue);
    let userId=this.authService.getId();
    let id = Number(userId);
    if(id){
      this.authService.logIn()
      this.router.navigateByUrl(`welcome/${id}`);
      this.connectionForm.reset();
    }

  }

}
