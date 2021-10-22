import { ElementRef, Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { FireStoreServiceService } from './fire-store-service.service';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const navigator = window.navigator as any;

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

  async exportJSPDF(type: string, pdfTable: ElementRef, name?:string, medType?: string): Promise<string> {

    let dataPdf = document.getElementById('pdfTable');
    
    const pdf = new jspdf('p', 'pt', 'a4', true);
    let canvas = await html2canvas(dataPdf, { logging: true, allowTaint: true, useCORS: true, scale: 3 });
    let img = canvas.toDataURL('image/png');
    pdf.addImage(img, 'png', 15, 10,dataPdf.scrollWidth, dataPdf.scrollHeight > 805?805:dataPdf.scrollHeight, 'FAST');
    
    return new Promise((resolve, reject) => {
      if (type === 'save') {
        pdf.save(`${name?name:type}.pdf`);
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
        
        if(this.checkMedia() || (!navigator.userAgent.includes('Mozilla') && !navigator.appVersion.includes('Mac'))){
          var file = new File([blobPDF],`${name?name:type}.pdf`,{type: blobPDF.type})
          resolve(this.sharePdf([file]));
        }else{
          this.fire.updloadFile(blobPDF, this.auth.userData.email, 'pdf').then(link => {
          resolve(link);
        });
        }
      }
    });
  }

  sharePdf(filesArray: Blob[]): string{
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator.share({
        files: filesArray,
        title: 'Recetas Médicas',
        text: 'Información Médica',
      })
      .then(() => {return 'success'})
      .catch((error) => {return error});
    } else {
      return 'error'
    }
    
  }

  checkMedia(){
    // Create a condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia('(max-width: 700px)')
    console.log(mediaQuery, 'HOLA')
   if (mediaQuery.matches) {
     return true;
   }else{
     return false;
   }
  }

}
