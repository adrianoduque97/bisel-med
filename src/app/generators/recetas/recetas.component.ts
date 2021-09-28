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
                  diagnostic: new FormControl('', Validators.required),
                  medicine:new FormControl('', Validators.required),
                  indication:new FormControl('', Validators.required),
                  recomendation: new FormControl('', Validators.required)
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
    this.data.diagnostic= this.medicineForm.value.diagnostic;
    this.data.medicine= this.medicineForm.value.medicine;
    this.data.indication= this.medicineForm.value.indication;
    this.data.recomendation= this.medicineForm.value.recomendation;

    this.htmlData = this.data;
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

        console.log(this.nameFile, 'file');
        console.log(target.files.item(0), 'filet');
      };
      reader.onerror = (e: any) => {
      };
      reader.onloadstart = (e: any) => {
      };
      reader.onloadend = (e: any) => {
      };
      reader.readAsBinaryString(target.files[0]);
    } catch(error){
      console.log(error);
    }
    
  }
}
