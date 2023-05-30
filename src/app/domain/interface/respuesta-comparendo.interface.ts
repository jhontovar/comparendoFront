export interface RespuestaComparendoDto {
    idComparendo?: string

    nroComparendo?: string

    fechaComp?: string

    horaComp?: string

    idEstadoComp?: string

    idSecretaria?: string

    fechaCargaSimit?: string

    idDocumento?: string

    idPlacaPatrullero?: string

    idInfraccion?: string

    resoluciones?: Array<any>

    recaudos?: Array<any>

    infractor?: any

    infraccion?: any

    estadoComp?: any

    secretaria?: any

    ////////////** Privadas*/
    fechaHoraComp?: string
    jurisdiccion?: string
    nombreApellido?: string
    fechaHora?: string
}