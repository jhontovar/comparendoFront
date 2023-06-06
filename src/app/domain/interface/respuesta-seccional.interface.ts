export interface RespuestaRecaudo {
    idRecaudo?: number;

    idComparendo?: number;

    idResolucion?: number;

    referencia?: string;

    fechaTransaccion?: any;

    fechaRecaudo?: any;

    idTipoRec?: number;

    porcentajeDescuento?: number;

    vrDescuento?: number;

    vrPagado?: number;

    transferido?: string;

    fechaTransferencia?: string;

    vrTransferido?: number;

    porcentajeDitra?: number;

    vrDitra?: number;

    porcentajeSimit?: number;

    vrSimit?: number;

    porcentajeMunicipio?: number;

    vrMunicipio?: number;

    idSecretaria?: number;

    nroRadicado?: number;

    fechaRadicado?: any;

    tipoRec?: any;

    secretaria?: any;

    comparendo?: any;

    resolucion?: any;

    seccional?: any;

    seccionales?: Array<any>;

    //Rpt
    nroComparendo?:string
    txtDepartamento?:string
    txtMunicipio?:string
    txtDocumento?:string
    txtTipoInfraccion?:string
    txtVrDiarioDesde?:string
    txtTipoRecaudo?:string
}