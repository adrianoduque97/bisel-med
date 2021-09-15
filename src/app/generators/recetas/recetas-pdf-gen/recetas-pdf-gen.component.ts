import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FireStoreServiceService } from '../../../shared/services/fire-store-service.service';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { PdfGeneratorService } from 'src/app/shared/services/pdf-generator.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-recetas-pdf-gen',
  templateUrl: './recetas-pdf-gen.component.html',
  styleUrls: ['./recetas-pdf-gen.component.css']
})
export class RecetasPdfGenComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @Input() htmlData;
  baseUrl = environment.baseUrl;

  set:any;

  constructor(public fire: FireStoreServiceService,
    public auth: AuthService,
    public pdfGen: PdfGeneratorService) { }

  ngOnInit(): void {
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
    let link = await this.pdfGen.exportPDF(type, this.pdfTable);
    console.log(link, 'link')
    if(type === 'share'){
      window.open(link, "_blank");
    }
    
  }

  getDate(){
    let date = new Date();
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

}
