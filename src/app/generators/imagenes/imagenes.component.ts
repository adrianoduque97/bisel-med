import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  medicineForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  htmlData: any;
  userInfo: any;
  imagenTipo = ['Radiografía','Tomografía','Resonancia','Ecografía','Procedimiento','Mamografía','Otro'];

  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  mail:new FormControl('', [Validators.required, Validators.email]),
                  docId:new FormControl('', Validators.required),
                  imagenTipo: new FormControl('',Validators.required ),
                  descripcion: new FormControl('', ),
                  motivo: new FormControl('', ),
                  resumen: new FormControl('', )
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
    this.data.imagenTipo= this.medicineForm.value.imagenTipo;
    this.data.descripcion= this.medicineForm.value.descripcion;
    this.data.motivo= this.medicineForm.value.motivo;
    this.data.resumen= this.medicineForm.value.resumen;

    this.htmlData = this.data;
  }

}
