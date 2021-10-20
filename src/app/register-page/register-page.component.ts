import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from '../shared/services/auth-service.service';
import { FireStoreServiceService } from '../shared/services/fire-store-service.service';
import { NavbarService } from '../shared/services/navbar.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  hugeLoading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(public authService: AuthService,
              public firestoreService: FireStoreServiceService,
              public navService: NavbarService,
              public notificationService: NotificationService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      register:new FormControl('', Validators.required),
      phone:new FormControl('', Validators.required),
      mail:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
    });
    this.nameFile = '';
    this.docFile = new FormData();
   }

  ngOnInit(): void {
    this.navService.hide();
    this.data={};
  }
  onClick(){
    this.hugeLoading= true;
    this.data.name= this.registerForm.value.name;
    this.data.register= this.registerForm.value.register;
    this.data.phone= this.registerForm.value.phone;
    this.data.mail= this.registerForm.value.mail;
    this.authService.SignUp(this.data.mail, this.registerForm.value.password, this.data ).then( data =>{
      this.notificationService.showNotification('success', 'Usuario Registrado con éxito');
      this.notificationService.showNotification('success', 'Puedes iniciar sesión');
      this.hugeLoading = false;
    }).catch(error =>{
      this.notificationService.showNotification('error', 'Usuario NO Registrado');
      this.hugeLoading = false;
    });
  }

  onFileChange(evt: any, files: File[]) {
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        throw new Error('Cannot use multiple files.');
      }
      
      if (!target.files.item(0).type.includes('pdf')){
        throw new Error('Invalid file type, just \'pdf\' files are supported.');
      }
      if (target.files.item(0).name.includes(' ')){
        throw new Error('Invalid file name, no empty spaces are supported, use _ instead.');
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const formData = new FormData();
        formData.append('file', <File>files[0]);
        this.docFile = formData;
        this.nameFile=target.files.item(0).name;;

        console.log(this.nameFile, 'file')
        console.log(target.files.item(0), 'filet')
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
