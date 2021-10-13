import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from '../shared/services/auth-service.service';
import { FireStoreServiceService } from '../shared/services/fire-store-service.service';
import { NavbarService } from '../shared/services/navbar.service';

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

  constructor(public authService: AuthService,
              public firestoreService: FireStoreServiceService,
              public navService: NavbarService) { 
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

  onFileChange(evt: any, files: File[], type: string) {
    try {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1){
        throw new Error('Cannot use multiple files.');
      }
      
      if (target.files.item(0).name.includes(' ')){
        throw new Error('Invalid file name, no empty spaces are supported, use _ instead.');
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
    
        this.firestoreService.updloadFile(type==='sello'?this.selloFile:this.signFile, `${this.authService.userData.email}/${type==='sello'?"sello":"firma"}`, target.files.item(0).type).then(link => {          
          if(type ==='sello'){
            this.firestoreService.getUser(this.userInfo.uid).update({
              sello: link
            }).then(()=>{
              this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
                this.userInfo = user.data();
              });
            });
          }else{
            this.firestoreService.getUser(this.userInfo.uid).update({
              firma: link
            }).then(()=>{
              this.firestoreService.getUser(this.localUser.uid).get().subscribe(user =>{
                this.userInfo = user.data();
              });
            });
          }
          
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
