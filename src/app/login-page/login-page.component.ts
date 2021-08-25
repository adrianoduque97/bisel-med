import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../shared/services/auth-service.service";
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  signupForm: FormGroup;
  data:any;

  constructor(public authService: AuthService,
              public navService: NavbarService) {
    this.signupForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.navService.hide();
    this.data={}
  }

  onClick(){
    this.data.user= this.signupForm.value.user;
    this.data.password= this.signupForm.value.password;
    console.log(this.data, 'AQUI');
    this.authService.SignIn(this.data.user, this.data.password);
  }

}
