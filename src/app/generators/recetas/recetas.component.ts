import { Component, OnInit } from '@angular/core';
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
  htmlData: any = {};
  userInfo: any;
  cie10: any[];
  med:any[] = [];
  sexo = ['Masculino', 'Femenino'];
  horas = ['Mañana','Medio Día','Tarde','Noche', 'Ninguna'];

  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  servicio: new FormControl('', Validators.required),
                  name: new FormControl('', Validators.required),
                  edad:new FormControl('', Validators.required),
                  meses:new FormControl('', Validators.required),
                  sex:new FormControl('', Validators.required),
                  docId:new FormControl('', Validators.required),
                  diagnostic: new FormControl('', Validators.required),
                  cie10: new FormControl('', Validators.required),
                  medicine:new FormControl(''),
                  admin:new FormControl(''),
                  dose:new FormControl(''),
                  freq:new FormControl(''),
                  duration:new FormControl(''),
                  hour:new FormControl(''),
                  advertencia: new FormControl('', Validators.required),
                  presentation: new FormControl('',),
                  quantity: new FormControl('',)
                });
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
    this.data.servicio= this.medicineForm.value.servicio;
    this.data.name= this.medicineForm.value.name;
    this.data.edad= [this.medicineForm.value.edad, this.medicineForm.value.meses];
    this.data.sex = this.medicineForm.value.sex;
    this.data.docId= this.medicineForm.value.docId;
    this.data.diagnostic= this.medicineForm.value.diagnostic;
    this.data.cie10= this.medicineForm.value.cie10;
    this.data.medicine= this.med;
    this.data.advertencia= this.medicineForm.value.advertencia;
    
    this.htmlData = this.data;
  }

  addMedicine(){
    this.med.push({
      medicine: this.medicineForm.value.medicine,
      admin: this.medicineForm.value.admin,
      dose: this.medicineForm.value.dose,
      freq: this.medicineForm.value.freq,
      duration: this.medicineForm.value.duration,
      hour: this.medicineForm.value.hour,
      quantity: this.medicineForm.value.quantity,
      presentation: this.medicineForm.value.presentation
    });
    this.medicineForm.get('medicine').reset();
    this.medicineForm.get('admin').reset();
    this.medicineForm.get('dose').reset();
    this.medicineForm.get('freq').reset();
    this.medicineForm.get('duration').reset();
    this.medicineForm.get('hour').reset();
    this.medicineForm.get('quantity').reset();
    this.medicineForm.get('presentation').reset();
    
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
