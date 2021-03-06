import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from '../shared/services/auth-service.service';
import { FireStoreServiceService } from '../shared/services/fire-store-service.service';
import { NavbarService } from '../shared/services/navbar.service';
import { NotificationService } from '../shared/services/notification.service';
import { RemovebgService } from '../shared/services/removebg.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userForm: FormGroup;
  data:any;
  userInfo: any;
  signFile: any;
  selloFile: any;
  localUser: any;
  hugeLoading = true;
  nameSign: any;
  nameSello: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  nameLogo: string;
  logoFile: File;

  constructor(public authService: AuthService,
              public firestoreService: FireStoreServiceService,
              public remover: RemovebgService,
              public navService: NavbarService,
              public notificationService: NotificationService) { 
              this.localUser = JSON.parse(localStorage.getItem('user'));
              this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
                this.userInfo = user.data();
                this.hugeLoading = false;
              });
    
                this.userForm = new FormGroup({
                  name: new FormControl('',),
                  register:new FormControl('',),
                  phone:new FormControl('', ),
                  mail:new FormControl('', ),
                });
              }

  ngOnInit(): void {
    this.navService.show();
    this.data={};
    
  }

  onClick(){
    this.data.name= this.userForm.value.name;
    this.data.register= this.userForm.value.register;
    this.data.phone= this.userForm.value.phone;
    this.data.mail= this.userForm.value.mail;

    console.log(this.data);
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


  onFileChange(evt: any, files: File[], type: string) {
    this.hugeLoading= true;
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'Solo se puede subir un archivo.');
        throw new Error('Solo se puede subir un archivo.');
      }
      
      if (target.files.item(0).name.includes(' ')){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'No se permiten espacios en el nombre, use _ en su lugar');
        throw new Error('No se permiten espacios en el nombre, use _ en su lugar');
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        if(type === 'sello'){
          this.nameSello=target.files.item(0).name;
          this.selloFile = <File>files[0];
        }else{
          this.nameSign=target.files.item(0).name;
          this.signFile = <File>files[0];
        }


var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "PEVWR2sQc4rYfC8ESbTJucte");

var formdata = new FormData();
formdata.append("image_file", type==='sello'?this.selloFile:this.signFile, "/C:/Users/adria/Downloads/firmaElvis2.jpeg");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata
};

fetch("https://api.remove.bg/v1.0/removebg?size='auto'", requestOptions)
  .then(response => {
    response.blob().then(fot=>{
      this.firestoreService.updloadFile(fot, `${this.authService.userData.email}/${type==='sello'?"sello":"firma"}`, target.files.item(0).type).then(link => {          
        if(type ==='sello'){
          this.firestoreService.getUser(this.userInfo.uid).update({
            sello: link
          }).then(()=>{
            this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
              this.userInfo = user.data();
              this.hugeLoading= false;
              this.notificationService.showNotification('success', 'Sello actualizado');
            });
          });
        }else{
          this.firestoreService.getUser(this.userInfo.uid).update({
            firma: link
          }).then(()=>{
            this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
              this.userInfo = user.data();
              this.hugeLoading= false;
              this.notificationService.showNotification('success', 'Firma actualizada');
            });
          });
        }
      });
    });

        
      });
      };
      reader.onerror = (e: any) => {
      };
      reader.onloadstart = (e: any) => {
      };
      reader.onloadend = (e: any) => {
      };
      reader.readAsBinaryString(target.files[0]);
    } catch(error){
      console.log(error)
    }
    
  }

  uploadLogo(evt: any, files: File[]) {
    this.hugeLoading= true;
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'S??lo se puede subir un archivo.');
        throw new Error('S??lo se puede subir un archivo.');
      }
      
      if (target.files.item(0).name.includes(' ')){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'No se permiten espacios en el nombre, use _ en su lugar');
        throw new Error('No se permiten espacios en el nombre, use _ en su lugar');
      }
      if(!target.files.item(0).type.includes('png')){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'Solo im??genes PNG aceptadas');
        throw new Error('Solo im??genes PNG aceptadas');
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
          this.nameLogo=target.files.item(0).name;

      this.firestoreService.updloadFile(target.files.item(0), `${this.authService.userData.email}/logo`, target.files.item(0).type).then(link => {          
          this.firestoreService.getUser(this.userInfo.uid).update({
            logo: link
          }).then(()=>{
            this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
              this.userInfo = user.data();
              this.hugeLoading= false;
              this.notificationService.showNotification('success', 'Logo actualizado');
            });
          });
        
      });
      };
      reader.onerror = (e: any) => {
      };
      reader.onloadstart = (e: any) => {
      };
      reader.onloadend = (e: any) => {
      };
      reader.readAsBinaryString(target.files[0]);
    } catch(error){
      console.log(error)
    }
    
  }

  uploadAcess(evt: any, files: File[]) {
    this.hugeLoading= true;
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'S??lo se puede subir un archivo.');
        throw new Error('S??lo se puede subir un archivo.');
      }
      if (target.files.item(0).name.includes(' ')){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'No se permiten espacios en el nombre, use _ en su lugar');
        throw new Error('No se permiten espacios en el nombre, use _ en su lugar');
      }
      if (!target.files.item(0).type.includes('pdf')){
        this.hugeLoading= false;
        this.notificationService.showNotification('error', 'Solo archivos PNDF aceptados');
        throw new Error('Solo archivos PNDF aceptados');
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {

      this.firestoreService.updloadFile(target.files.item(0), `${this.authService.userData.email}/logo`, target.files.item(0).type).then(link => {          
          this.firestoreService.getUser(this.userInfo.uid).update({
            acess: link
          }).then(()=>{
            this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
              this.userInfo = user.data();
              this.hugeLoading= false;
              this.notificationService.showNotification('success', 'Acess actualizado');
            });
          });
        
      });
      };
      reader.onerror = (e: any) => {
      };
      reader.onloadstart = (e: any) => {
      };
      reader.onloadend = (e: any) => {
      };
      reader.readAsBinaryString(target.files[0]);
    } catch(error){
      console.log(error)
    }
    
  }

}
