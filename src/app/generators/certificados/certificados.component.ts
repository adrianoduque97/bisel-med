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
  htmlData: any = [];
  userInfo: any;
  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  docId:new FormControl('', Validators.required),
                  city: new FormControl('', Validators.required),
                  certificado: new FormControl('', Validators.required),
                  diagnostic: new FormControl('', Validators.required),
                  cie10: new FormControl('', Validators.required),
                  reposoD: new FormControl('', Validators.required),
                  reposoH: new FormControl('', Validators.required)
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
    this.data.docId= this.medicineForm.value.docId;
    this.data.city= this.medicineForm.value.city;
    this.data.certificado= this.medicineForm.value.certificado;
    this.data.diagnostic= this.medicineForm.value.diagnostic;
    this.data.cie10= this.medicineForm.value.cie10;
    this.data.reposoD= this.medicineForm.value.reposoD;
    this.data.reposoH= this.medicineForm.value.reposoH;

    this.htmlData = this.data;
  }

  dateChange(){
    this.htmlData['reposoD'] = this.medicineForm.value.reposoD;
    this.htmlData['reposoH'] = this.medicineForm.value.reposoH;
  }
}
