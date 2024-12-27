import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../Entidades/Estudiante';
import { TLista } from '../../Controller/TLista';
import { NgFor } from '@angular/common';
import { AgregarComponent } from "../agregar/agregar.component";
// import { AgregarComponent } from "../agregar/agregar.component";

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [NgFor, AgregarComponent],
  // imports: [NgFor, AgregarComponent],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  estudiantes:Estudiante[]=[];
  selectedEstudiante: Estudiante|null= null;
  isOpen: boolean = false;

  constructor(private OLista: TLista){}

  ngOnInit() {
    this.OLista.estudiantes$.subscribe((data) => {
      this.estudiantes = data;
      this.calcularPorcentajeAprobadosReprobados();
      this.calcularPorcentajeAprobadosSexo();
      this.calcularPromedioGeneralYMayorNota();
    });
  }
  editEstudiante(oEstudiante: Estudiante) {
    this.selectedEstudiante = oEstudiante;  
    this.isOpen = true;
  }

  deleteEstudiante(index:number){
    this.OLista.deleteEstudiante(index);
  }

  onCloseModal(){
    this.isOpen=false;
    this.selectedEstudiante = null;
  }

   // Variables para almacenar los resultados de las consultas
   porcentajeAprobados: number = 0;
   porcentajeReprobados: number = 0;
   porcentajeAprobadosSexo: { masculino: number, femenino: number } = { masculino: 0, femenino: 0 };
   promedioGeneral: number = 0;
   estudianteMayorNota: Estudiante | null = null;

  calcularPorcentajeAprobadosReprobados() {
    const totalEstudiantes = this.estudiantes.length;
    const aprobados = this.estudiantes.filter(est => est.estado).length;
    const reprobados = totalEstudiantes - aprobados;
    this.porcentajeAprobados = (aprobados / totalEstudiantes) * 100;
    this.porcentajeReprobados = (reprobados / totalEstudiantes) * 100;
  }

  calcularPorcentajeAprobadosSexo() {
    const totalEstudiantesMasculino = this.estudiantes.filter(est => est.sexo === 'Masculino').length;
    const totalEstudiantesFemenino = this.estudiantes.filter(est => est.sexo === 'Femenino').length;
    const aprobadosMasculino = this.estudiantes.filter(est => est.sexo === 'Masculino' && est.estado).length;
    const aprobadosFemenino = this.estudiantes.filter(est => est.sexo === 'Femenino' && est.estado).length;
    this.porcentajeAprobadosSexo.masculino = totalEstudiantesMasculino ? (aprobadosMasculino / totalEstudiantesMasculino) * 100 : 0;
    this.porcentajeAprobadosSexo.femenino = totalEstudiantesFemenino ? (aprobadosFemenino / totalEstudiantesFemenino) * 100 : 0;
  }

  calcularPromedioGeneralYMayorNota() {
    const totalNotas = this.estudiantes.reduce((sum, est) => sum + est.ND, 0);
    const promedio = totalNotas / this.estudiantes.length;
    this.promedioGeneral = promedio;
    this.estudianteMayorNota = this.estudiantes.filter(est => est.ND > promedio).reduce((prev, current) => (prev.ND > current.ND) ? prev : current, this.estudiantes[0]);
  }


}
