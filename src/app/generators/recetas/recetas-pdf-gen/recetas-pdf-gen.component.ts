import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-recetas-pdf-gen',
  templateUrl: './recetas-pdf-gen.component.html',
  styleUrls: ['./recetas-pdf-gen.component.css']
})
export class RecetasPdfGenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('imgTest') imgTest: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();
    
    const pdfTable = this.pdfTable.nativeElement;
    const imageLink = this.imgTest;

    this.getBase64ImageFromUrl(imageLink.nativeElement.currentSrc)
    .then(result => {
      let s = pdfTable.innerHTML;
      let htmlWithImage = this.replaceRange(s,s.search('src="')+5,s.search('style="width:'), `${result}"`);

      var htmlContent = htmlToPdfmake(htmlWithImage);
      const documentDefinition = { content: htmlContent };
      pdfMake.createPdf(documentDefinition).open(); 
    })
    .catch(err => console.error(err));
  }

  replaceRange(s: string, start :number, end:number, substitute:string): string {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  async  getBase64ImageFromUrl(imageUrl: string): Promise<any> {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

}
