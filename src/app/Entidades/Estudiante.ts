export class Estudiante {
    codigo: number;
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: string;
    parcial1: number;
    parcial2: number;
    CF: number;
    ER: number | null;
    ND: number;
    estado: boolean;
    constructor(cod: number, ced: string, nom: string, ape: string, sex: string, fecha: string, par1: number, par2: number, examenrecuperacion: number | null = null) {
        this.codigo = cod;
        this.cedula = ced;
        this.nombre = nom;
        this.apellido = ape;
        this.sexo = sex;
        this.fechaNacimiento = fecha;
        this.parcial1 = par1;
        this.parcial2 = par2;
        this.ER = examenrecuperacion;
        this.CF = (par1 + par2) / 2;
        this.CF = this.calcularCF(); 
        this.ND = this.calcularND(); 
        this.estado = this.determinarEstado(); 
    }

    private calcularCF(): number {
        return (this.parcial1 + this.parcial2) / 2;
    }

    private calcularND(): number {
        if (this.CF >= 7 || this.CF < 5.5) {
            return this.CF;
        } 
        else if (this.ER !== null) {
            return this.CF * 0.4 + this.ER * 0.6;
        } 
        else {
            return this.CF;
        }
    }
    


    private determinarEstado(): boolean {
        if (this.CF >= 7) {
            return true; 
        } else if (this.CF < 5.5) {
            return false; 
        } else {
            return this.ND !== null && this.ND >= 7;
        }
    }
}