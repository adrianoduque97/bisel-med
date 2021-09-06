import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  registerForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  htmlData: any;
  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.registerForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  register:new FormControl('', Validators.required),
                  phone:new FormControl('', Validators.required),
                  mail:new FormControl('', Validators.required),
                  password:new FormControl('', Validators.required),
                });
              }

  ngOnInit(): void {
    this.nav.show();
    this.data={};
  }

  onClick(){
    this.data.name= this.registerForm.value.name;
    this.data.register= this.registerForm.value.register;
    this.data.phone= this.registerForm.value.phone;
    this.data.mail= this.registerForm.value.mail;
    this.data.password= this.registerForm.value.password;

    this.htmlData = this.data;
  }
}
