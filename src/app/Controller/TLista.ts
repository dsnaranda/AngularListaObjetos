import { BehaviorSubject } from "rxjs";
import { Estudiante } from "../Entidades/Estudiante";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class TLista{

    private ListaEstudiantes:Estudiante[]=[
        new Estudiante(1,'0705576254', 'Derik', 'Aranda', 'Masculino', '27-07-1999', 10, 10),
        new Estudiante(2,'0706670254', 'Camily', 'Bravo', 'Femenino', '22-06-2003', 10, 3, 8),
        new Estudiante(3,'0706770258', 'Yarisel', 'Orosco', 'Femenino', '11-03-2003', 10, 3, 1),
    ];

    constructor() {}

    private estudiantesSubject = new BehaviorSubject<Estudiante[]>(this.ListaEstudiantes);
    estudiantes$ = this.estudiantesSubject.asObservable();

    getEstudiantes() {
        return this.estudiantesSubject.value;
    }

    addEstudiante(es: Estudiante) {
        this.ListaEstudiantes.push(es);
        this.estudiantesSubject.next(this.ListaEstudiantes);
    }

    updateEstudiante(es: Estudiante) {
        const currentEstudiantes = this.estudiantesSubject.value;
        const index = currentEstudiantes.findIndex(c => c.codigo === es.codigo);
        if (index !== -1) {
            // Actualizar la lista de estudiantes
            this.ListaEstudiantes[index] = es;
            this.estudiantesSubject.next(this.ListaEstudiantes);
        } else {
            console.error('Estudiante no encontrado');
        }
    }

    deleteEstudiante(index: number) {
        this.ListaEstudiantes.splice(index, 1);
        this.estudiantesSubject.next(this.ListaEstudiantes);
    }
}