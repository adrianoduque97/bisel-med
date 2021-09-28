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

  loading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  
  constructor(public fire: FireStoreServiceService,
    public auth: AuthService,
    public pdfGen: PdfGeneratorService,
    ) { 
      console.log(this.htmlData,'DATA')
    }

  ngOnInit(): void {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    this.fire.getUser(userLocal.uid).get().subscribe(async user =>{
      this.user = user.data();
    });
    
  }
  async exportPDF(type: string){
    // let se = await this.pdfGen.exportPDF(type, this.pdfTable);

    let set = await this.pdfGen.exportPDF(type, this.pdfTable);
    
    // const targetElement = document.querySelector('#iframeContainer');
    // const iframe = document.createElement('iframe');
    // iframe.src = set;
    // iframe.width = '650px';
    // iframe.height = '300px'
    // this.set = set;
    // targetElement.appendChild(iframe);
  }

  async getSharePDF (type){
      this.loading = true;
      setTimeout(() => this.loading = false, 2000);
    
    let link = await this.pdfGen.exportPDF(type, this.pdfTable);
      this.pdfLiknk =  link;
  }

  getDate(){
    let date = new Date();
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  load() {
    this.loading = true;
    setTimeout(() => this.loading = false, 2000);
  }

}