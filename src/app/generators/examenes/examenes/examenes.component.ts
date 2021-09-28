import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {
  
  medicineForm: FormGroup;
  data:any;
  nameFile: string;
  docFile: FormData;
  htmlData: any;
  userInfo: any;
  hematologiaInfo = ['Biometría Hemática', 'Plaquetas', 'Grupo/Rh.', 'Reticulocitos', 'Hematozoario', 'Célula LE', 'índices Hemáticos', 'T. Protrombina', 'Tiempo T.Parcial', 'Drepanocitos','Coombs Directo', 'Coombs Indirecto'];
  quimicaInfo = ['Glucosa Ayunas', 'Glucosa 2 Horas', 'Urea', 'Creatinina', 'Ácido úrico', 'Bilirrubinas','Proteínas', 'Transaminadas Pirúvica','Transaminasa Oxalacética', 'Colesterol Total','Colesterol HDL','Colesterol LDL', 'Triglicéridos'];
  coproInfo = ['Coproparasitario','Sangre oculta', 'Inv. Poumorfo Nucleares','Rotavirus'];
  uroInfo = ['Elemental y macroscopio','Gota Fresca', 'GRAM','Índices Hemáticos','T.Protrombina'];
  bacterInfo= ['GRAM','ZIEHL','Fresco','Hongos','Cultivo y Antibiograma'];
  serioInfo = ['VDRL','Reacción de WIDAL', 'Prueba de embarazo', 'PCR', 'RAT','ASTO'];
  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  mail:new FormControl('', [Validators.required, Validators.email]),
                  docId:new FormControl('', Validators.required),
                  hematologia: new FormControl('', ),
                  quimica: new FormControl('', ),
                  copro:new FormControl('', ),
                  uro:new FormControl('', ),
                  bacter: new FormControl('', ),
                  serio: new FormControl('', ),
                  otros: new FormControl('', )
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
    this.data.hematologia= this.medicineForm.value.hematologia;
    this.data.quimica= this.medicineForm.value.quimica;
    this.data.copro= this.medicineForm.value.copro;
    this.data.uro= this.medicineForm.value.uro;
    this.data.bacter= this.medicineForm.value.bacter;
    this.data.serio= this.medicineForm.value.serio;
    this.data.otros= this.medicineForm.value.otros;

    this.htmlData = this.data;

  }
}
