import { ElementRef, Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { FireStoreServiceService } from './fire-store-service.service';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(public fire: FireStoreServiceService,
    public auth: AuthService) { }



  async exportPDF(type: string, pdfTable: ElementRef): Promise<string> {
    const pdfTableLocal = pdfTable.nativeElement;

    var htmlContent = htmlToPdfmake(pdfTableLocal.innerHTML, {
      imagesByReference: true,
      tableAutoSize: true
    });

    const documentDefinition = {
      content: htmlContent.content,
      images: htmlContent.images,
    }

    return new Promise((resolve, reject) => {
      if (type === 'save') {
        pdfMake.createPdf(documentDefinition).download();
        resolve('save');
      } else if (type === 'open') {
        pdfMake.createPdf(documentDefinition).open();
        resolve('open');
      } else if (type === 'print') {
        pdfMake.createPdf(documentDefinition).print();
        resolve('print');
      } else if (type === 'share') {
        let doc = pdfMake.createPdf(documentDefinition);

        doc.getBlob(async (blob: Blob) => {
          this.fire.updloadFile(blob, this.auth.userData.email, 'pdf').then(link => {
            resolve(link);
          });
        });
      } else if (type === 'embed') {
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
          resolve(dataUrl);
        });
      }
    });

  }

  async exportJSPDF(type: string, pdfTable: ElementRef): Promise<string> {

    let dataPdf = document.getElementById('pdfTable');
    
    const pdf = new jspdf('p', 'px', 'a4', true);
    let canvas = await html2canvas(dataPdf, { logging: true, allowTaint: true, useCORS: true, scale: 3 });
    let img = canvas.toDataURL('image/png');
    // pdf.addImage(img, 'png', 40, 50, 415 > dataPdf.offsetWidth?415:dataPdf.offsetWidth, dataPdf.offsetHeight+100);
    pdf.addImage(img, 'png', 15, 15, 415, 400,'','FAST');

    return new Promise((resolve, reject) => {
      if (type === 'save') {
        pdf.save(`${type}.pdf`);
        resolve('save');
      } else if (type === 'open') {
        pdf.output('dataurlnewwindow');
        resolve('open');
      } else if (type === 'print') {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
        resolve('print');
      } else if (type === 'share') {
        var blobPDF = pdf.output('blob');
        this.fire.updloadFile(blobPDF, this.auth.userData.email, 'pdf').then(link => {
          resolve(link);
        });
      }
    });
  }

}
