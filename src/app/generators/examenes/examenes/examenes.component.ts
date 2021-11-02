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
  hematologiaInfo = ['Biometría Hemática', 'Plaquetas', 'Grupo/Rh.', 'Reticulocitos', 'Hematozoario', 'Célula LE', 'índices Hemáticos', 'T. Protrombina','T. de Sangría','T. de Coagulación','T.P. de Tomboplastina TPT', 'T.Parcial', 'Drepanocitos','Coombs Directo', 'Coombs Indirecto','Eritrosedimentación (VSG)','Frotosis de sangre periférica','Fibronogeno'];
  quimicaInfo = ['Glucemia','Glucemia postpandrial','P. Tolerancia Glucosa','Hemoglobina Glicosilada','Glucosa Ayunas', 'Glucosa 2 Horas', 'Urea', 'Creatinina', 'Ácido úrico', 'Bilirrubina Total','Bilirrubina Directa','Bilirrubina Indirecta','Proteínas y Fracciones', 'Transaminasa Glutámico Pirúvica','Transaminasa Glutámico Oxalacética', 'Colesterol Total','Colesterol HDL','Colesterol LDL','Colesterol VLDL', 'Triglicéridos','Líquidos Totales','Hierro serico','Ferritina','Insulina','Homa Ir'];
  hecesInfo = ['Parasitológico','Coproparasitario','Sangre oculta', 'Inv. Poumorfo Nucleares','Rotavirus','Moco Fecal','H. Pylori Antígeno'];
  bacterInfo= ['Exudados-Trasudados','Esputos','Secreciones','Orinas-Uro','Heces-Copro','Heridas-Copro','Heridas y Úlceras','T.Gram','Ziehi Neelsen','Tinta China','KOH','Fresco','Hongos','Cultivo y Antibiograma','Gota Fresca'];
  serioInfo = ['VDRL','Reacción de WIDAL','Reacción de Hudiesson', 'Prueba de embarazo', 'PCR Cualitativo', 'RA Test Cualitativo','ASTO Cuantitativo','ASTO Cualitativo','Stred-A','Complemento C3-C4'];
  uroInfo = ['Físico, químico, sedimento', 'Proteínas ocasional 24h.','Depuración de creatinina','Proteínas de Bence Jones','Cálculo Urinario'];

  enzimasInfo = ['TGO (AST)','TGP (ALT)','Gamma GT','Amilasa','Lipasa','LDH','CK-Total','CK-MB','Colinesterasa','Fost. Alcalina'];
  electrolitosInfo = ['Sodio','Potasio','Cloro','Fósforo','Magnesio','Calcio'];
  especialesInfo = ['Citomegalovirus IgG-IgM','Rubeola IgM-IgG','Herpes virus I-II IgM-IgG','Chlamydias IgM-IgG','Dengue','HIV','Hepatitis A IgM','Hepatitis A IgG','Hepatitis B(HBsAb)','Hepatitis B(HBsAg)','Anti-e-Hepatitis B (HB-e-Ab)','Anti Hepatitis C','Anti H.Pylori IgM-IgG-IgA'];
  inmunoInfo = ['IgG','IgE','IgM','IgA'];
  endoInfo = ['T3 Total','FT3 Libre','T4 Total','FT4 Libre','TSH','Anti Tiroglobulina','Tiroglobulina','FSH','LH','Progesterona','Estraidol','Estirol Libre','Cortisol','Prolactina','H. Crecimiento'];
  tumorInfo = ['Alfa feto proteína AFP','Ag Carciembrionario CEA','CA 125 (Ovario-Utero)','CA 19-9','CA 72-4','PSA TOTAL','PSA LIBRE'];
  liquiInfo = ['LCR', 'Liq. Sinovial', 'Liq. Ascítico','Liq. Peritoneal','Liq. Pleural','Liq. Espermático'];

  priorityOptions = ['URGENTE','CONTROL'];
  constructor(public nav: NavbarService,
              public authService: AuthService,
              public firestoreService: FireStoreServiceService) { 
                this.medicineForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  priority:new FormControl('', Validators.required),
                  dateToma: new FormControl(''),
                  docId:new FormControl('', Validators.required),
                  hematologia: new FormControl('', ),
                  quimica: new FormControl('', ),
                  heces:new FormControl('', ),
                  uro:new FormControl('', ),
                  bacter: new FormControl('', ),
                  serio: new FormControl('', ),

                  enzimas: new FormControl('', ),
                  electro: new FormControl('', ),
                  especial: new FormControl('', ),
                  inmuno: new FormControl('', ),
                  endo: new FormControl('', ),
                  tumor: new FormControl('', ),
                  liquido: new FormControl('', ),

                  otros: new FormControl('', ),
                  observation: new FormControl('',)
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
    this.data.priority= this.medicineForm.value.priority;
    this.data.dateToma= this.medicineForm.value.dateToma;
    this.data.docId= this.medicineForm.value.docId;
    this.data.hematologia= this.medicineForm.value.hematologia;
    this.data.quimica= this.medicineForm.value.quimica;
    this.data.heces= this.medicineForm.value.heces;
    this.data.uro= this.medicineForm.value.uro;
    this.data.bacter= this.medicineForm.value.bacter;
    this.data.serio= this.medicineForm.value.serio;

    this.data.enzimas= this.medicineForm.value.enzimas;
    this.data.electro= this.medicineForm.value.electro;
    this.data.especial= this.medicineForm.value.especial;
    this.data.inmuno= this.medicineForm.value.inmuno;
    this.data.endo= this.medicineForm.value.endo;
    this.data.tumor= this.medicineForm.value.tumor;
    this.data.liquido= this.medicineForm.value.liquido;
    this.data.otros= this.medicineForm.value.otros;
    this.data.observation= this.medicineForm.value.observation;

    this.htmlData = this.data;

  }

  newInfo(){
    this.medicineForm.reset();
    this.htmlData={};
  }
}
