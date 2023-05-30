import { Injectable } from '@angular/core';

//import { PDF } from '../models/pdf.model'; 

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF } from '../model/pdf';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  template: any;
  constructor() { }

  generarTemplatePDF(title: string) {
    return new PDF(title);
  }

  generarPDF(template: PDF) {
    let contentPdf = JSON.parse(JSON.stringify(template.hoja).slice());
    const pdf = pdfMake.createPdf(contentPdf); 
    pdf.open();
  }


  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}
}
