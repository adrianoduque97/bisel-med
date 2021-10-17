import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { FireStoreServiceService } from 'src/app/shared/services/fire-store-service.service';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-examenes-pdf-gen',
  templateUrl: './examenes-pdf-gen.component.html',
  styleUrls: ['./examenes-pdf-gen.component.css']
})
export class ExamenesPdfGenComponent implements OnInit {
  
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @Input() htmlData;
  baseUrl = environment.baseUrl;
  pdfLiknk: string;
  set:any;
  user: any;
  date: Date = new Date();
  hugeLoading = false;
  loading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  
  constructor(public fire: FireStoreServiceService,
    public auth: AuthService,
    public pdfGen: PdfGeneratorService,
    ) { 
    }

  ngOnInit(): void {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    this.fire.getUser(userLocal.uid).get().subscribe(async user =>{
      this.user = user.data();
    });
    
  }
  async exportPDF(type: string){
    this.hugeLoading = true;
    this.pdfGen.exportJSPDF(type, this.pdfTable, this.htmlData?.name).then(res =>{
      this.hugeLoading= false;
    });
  }

  async getSharePDF (type){
    this.loading = true;
    this.pdfGen.exportJSPDF(type, this.pdfTable).then(link =>{
    this.pdfLiknk =  link;
    this.loading = false
  });
  }
  load() {
    this.loading = true;
    setTimeout(() => this.loading = false, 2000);
  }

}
