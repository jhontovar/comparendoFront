export interface RespuestaCaduPrescripcion {
    resolucion?: any
    secretaria?: any
    infractor?: any
    comparendo?: any
    cartera?: any;
    fechaCaducar?: string;
    

    //Funciones
    txtMunicipio?:string;
    txtNombreOperador?:string;
    txtZona?:string;
    txtDepartamento?:string;
    txtNroResolucion?:string;
    txtFechaResolucion?:string;
    txtNombre?:string;
    txtApellido?:string;
    txtTipoDocumento?:string;
    txtDocumento?:string;
    txtcodigoInfraccion?:string;
    txtNroComparendo?:string;
    txtFehaComparendo?:string;
    txtFechaCaducar?:string;
    txtTotalCarteta?:number;
}