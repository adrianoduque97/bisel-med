import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FireStoreServiceService } from '../../../shared/services/fire-store-service.service';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { environment } from '../../../../environments/environment';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import Utils from '../../../shared/Utils/recetas.utils';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-recetas-pdf-gen',
  templateUrl: './recetas-pdf-gen.component.html',
  styleUrls: ['./recetas-pdf-gen.component.css']
})
export class RecetasPdfGenComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @Input() htmlData: any;
  baseUrl = environment.baseUrl;
  pdfLiknk: string;
  set:any;
  user: any;
  date: Date = new Date();
  loading = false;
  hugeLoading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(public fire: FireStoreServiceService,
    public auth: AuthService,
    public pdfGen: PdfGeneratorService,
    ) { }

  ngOnInit(): void {
    let userLocal = JSON.parse(localStorage.getItem('user'));
    this.fire.getUser(userLocal.uid).get().subscribe(async user =>{
      this.user = user.data();
    });
  }

  async exportPDF(type: string){
    this.hugeLoading = true;
    this.pdfGen.exportJSPDF(type, this.pdfTable).then(res =>{
      this.hugeLoading= false;
    });
  }
  isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  async getSharePDF (type: string){
      this.loading = true;
      this.pdfGen.exportJSPDF(type, this.pdfTable).then(link =>{
      this.pdfLiknk =  link;
      this.loading = false
    });
  }


}
