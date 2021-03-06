import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth-service.service';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  
  restoreForm: FormGroup;
  data:any;
  constructor(public authService: AuthService,
            public navService: NavbarService) { 
    this.restoreForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.navService.hide();
    this.data={}
  }

  onClick(){
    this.data.email= this.restoreForm.value.email;
    this.authService.ForgotPassword(this.data.email);
  }

}
