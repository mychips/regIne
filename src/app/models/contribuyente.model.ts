export class ContribuyenteIne {
    id?: string;
    nombres: string;
    apellidos: string;
    domicilio: string;
    claveIne: string;
    curp: string;
    fechaNac: Date;
    estado: string;
    municipio: string;
    seccion: number;
    emision: number;
    vigencia: number;    

    constructor( nombres: string, apellidos: string, domicilio: string,
        claveIne: string, curp: string, fechaNac: Date, estado: string,
        municipio: string, seccion: number, emision: number, vigencia: number) {

            this.nombres    = nombres;
            this.apellidos  = apellidos;
            this.domicilio  = domicilio;
            this.claveIne   = claveIne;
            this.curp       = curp;
            this.fechaNac   = fechaNac;
            this.estado     = estado;
            this.municipio  = municipio;
            this.seccion    = seccion;
            this.emision    = emision;
            this.vigencia   = vigencia;
    }
}