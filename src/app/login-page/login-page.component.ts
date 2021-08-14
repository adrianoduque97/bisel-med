import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  signupForm: FormGroup;
  data:any;

  constructor() {
    this.signupForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.data={}
  }

  onClick(){
    this.data.user= this.signupForm.value.user;
    this.data.password= this.signupForm.value.password;
    console.log(this.data, 'AQUI');
  }

}