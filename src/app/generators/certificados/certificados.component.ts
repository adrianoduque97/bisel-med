import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  medicineForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  htmlData: any;
  userInfo: any;
  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  mail:new FormControl('', [Validators.required, Validators.email]),
                  docId:new FormControl('', Validators.required),
                  certificado: new FormControl('', Validators.required),
                });
              }

  ngOnInit(): void {
    this.nav.show();
    this.data={};
    let userLocalStorage = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getUser(userLocalStorage.uid).get().subscribe(user =>{
      this.userInfo = user.data();
    });
  }

  onClick(){
    this.data.name= this.medicineForm.value.name;
    this.data.mail= this.medicineForm.value.mail;
    this.data.docId= this.medicineForm.value.docId;
    this.data.certificado= this.medicineForm.value.certificado;

    this.htmlData = this.data;
  }
}
