// You should specify the CKEditor 5 build you use here:
declare module "pdfmake/build/pdfmake" {
    const pdfMake: any;
    export = pdfMake;
  }

  declare module 'pdfmake/build/vfs_fonts' {
    const pdfFonts: any;
    export = pdfFonts;
  }

  declare module 'file-saver' {
    const FileSaver: any;
    export = FileSaver;
  }
  