import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import firebase  from 'firebase';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  medicineForm: FormGroup;
  medForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  htmlData: any = {};
  userInfo: any;
  cie10: any[];
  med:any[] = [];
  sexo = ['Masculino', 'Femenino'];
  horas = ['Mañana','Medio Día','Tarde','Noche', 'Ninguna'];
  localUser: any;
  loading = false;
  increment: any;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  servicio: new FormControl(''),
                  name: new FormControl('', Validators.required),
                  edad:new FormControl('', Validators.required),
                  meses:new FormControl('',),
                  sex:new FormControl('', Validators.required),
                  docId:new FormControl('', Validators.required),
                  diagnostic: new FormControl('', Validators.required),
                  cie10: new FormControl('', Validators.required),
                  recomendaciones: new FormControl('', ),
                  
                });

                this.medForm =  new FormGroup({
                  medicine:new FormControl('',  Validators.required),
                  admin:new FormControl('', Validators.required),
                  dose:new FormControl('', Validators.required),
                  freq:new FormControl('', Validators.required),
                  duration:new FormControl('', Validators.required),
                  hour:new FormControl('', Validators.required),
                  presentation: new FormControl('', Validators.required),
                  quantity: new FormControl('', Validators.required)
                });

                this.increment = firebase.firestore.FieldValue.increment(1);
              }

  ngOnInit(): void {
    this.nav.show();
    this.data={};
    let userLocalStorage = JSON.parse(localStorage.getItem('user'));
    this.firestoreService.getUser(userLocalStorage.uid).get().subscribe(user =>{
      this.userInfo = user.data();
    });
    // var cie10 = require('cie10');
    // this.cie10 = cie10('array'); 
  }

  onClick(){
    this.loading = true;
    this.data.servicio= this.medicineForm.value.servicio;
    this.data.name= this.medicineForm.value.name;
    this.data.edad= [this.medicineForm.value.edad, this.medicineForm.value.meses];
    this.data.sex = this.medicineForm.value.sex;
    this.data.docId= this.medicineForm.value.docId;
    this.data.diagnostic= this.medicineForm.value.diagnostic;
    this.data.cie10= this.medicineForm.value.cie10;
    this.data.medicine= this.med;
    this.data.recomendaciones= this.medicineForm.value.recomendaciones;

    this.firestoreService.getUser(this.userInfo.uid).update({
      contador: this.increment
    }).then(()=>{
      this.firestoreService.getUser(this.userInfo.uid).get().subscribe(user =>{
        let userInfo : any = user.data();
        this.data.contador = userInfo.contador;
        this.htmlData = this.data;
        this.loading = false;
      });
    });
  }

  newInfo(){
    this.medicineForm.reset();
    this.medForm.reset();
    this.htmlData = {};
  }

  addMedicine(){
    this.med.push({
      medicine: this.medForm.value.medicine,
      admin: this.medForm.value.admin,
      dose: this.medForm.value.dose,
      freq: this.medForm.value.freq,
      duration: this.medForm.value.duration,
      hour: this.medForm.value.hour,
      quantity: this.medForm.value.quantity,
      presentation: this.medForm.value.presentation
    });
    this.medForm.get('medicine').reset();
    this.medForm.get('admin').reset();
    this.medForm.get('dose').reset();
    this.medForm.get('freq').reset();
    this.medForm.get('duration').reset();
    this.medForm.get('hour').reset();
    this.medForm.get('quantity').reset();
    this.medForm.get('presentation').reset();
    
    this.htmlData['medicine'] = this.med;
  }

  removeMedicine(medicine: any){
    this.med = this.med.filter( item =>
      item.medicine !== medicine.medicine && item.dose !== medicine.dose
    );
    this.htmlData['medicine'] = this.med;
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
