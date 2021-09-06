import { ElementRef, Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { FireStoreServiceService } from './fire-store-service.service';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(public fire: FireStoreServiceService, 
              public auth: AuthService) { }

  

  async exportPDF(type: string, pdfTable: ElementRef):Promise<string> {
    const pdfTableLocal = pdfTable.nativeElement;

    var htmlContent = htmlToPdfmake(pdfTableLocal.innerHTML, {
      imagesByReference: true
    });

    const documentDefinition = {
      content: htmlContent.content,
      images: htmlContent.images
    }

    return new Promise((resolve, reject)=>{
      if (type === 'save') {
        pdfMake.createPdf(documentDefinition).download();
        resolve('save');
      } else if (type === 'open') {
        pdfMake.createPdf(documentDefinition).open();
        resolve('open');
      } else if (type === 'share') {
        let doc = pdfMake.createPdf(documentDefinition);
  
        doc.getBlob(async (blob: Blob) => {
          this.fire.updloadFile(blob, this.auth.userData.email, 'pdf').then(link => {
            resolve(link);
          });
        });
      } else if (type === 'embed'){
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
          resolve(dataUrl);
        });
      }
    });

  }

}
