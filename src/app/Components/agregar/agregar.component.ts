import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Estudiante } from '../../Entidades/Estudiante';
import { TLista } from '../../Controller/TLista';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

  @Input() isOpen = false;
  @Input() selectedEstudiante: Estudiante | null = null;

  @Output() close = new EventEmitter<void>();

  oEstudiante = {
    codigo: 0,
    cedula: '',
    nombre: '',
    apellido: '',
    sexo: '',
    fechaNacimiento: '',
    parcial1: 0,
    parcial2: 0,
    ER: 0, // Inicia con un valor numérico
  }

  constructor(private OLista: TLista) {

  }

  public resetEstudiante() {
    this.oEstudiante = {
      codigo: 0,
      cedula: '',
      nombre: '',
      apellido: '',
      sexo: '',
      fechaNacimiento: '',
      parcial1: 0,
      parcial2: 0,
      ER: 0, // Inicia con un valor numérico
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedEstudiante'] && this.selectedEstudiante) {
      this.oEstudiante = {
        ...this.selectedEstudiante,
        ER: this.selectedEstudiante.ER != null ? this.selectedEstudiante.ER : 0, // Asigna 0 en lugar de null
      };
    } else if (!this.selectedEstudiante) {
      this.resetEstudiante();
    }
  }
  

  closeModal(){
    this.close.emit();
  }

  onCloseModal(){
    this.closeModal();
  }

  onSubmit() {
    if (this.selectedEstudiante) {
      // Si hay un estudiante seleccionado, actualiza
      const estudianteActualizado = new Estudiante(
        this.oEstudiante.codigo,
        this.oEstudiante.cedula,
        this.oEstudiante.nombre,
        this.oEstudiante.apellido,
        this.oEstudiante.sexo,
        this.oEstudiante.fechaNacimiento,
        this.oEstudiante.parcial1,
        this.oEstudiante.parcial2
      );
  
      this.OLista.updateEstudiante(estudianteActualizado);
      this.closeModal();
    } else {
      // Si no hay un estudiante seleccionado, agrega uno nuevo
      const nuevoEstudiante = new Estudiante(
        this.oEstudiante.codigo,
        this.oEstudiante.cedula,
        this.oEstudiante.nombre,
        this.oEstudiante.apellido,
        this.oEstudiante.sexo,
        this.oEstudiante.fechaNacimiento,
        this.oEstudiante.parcial1,
        this.oEstudiante.parcial2
      );
  
      this.OLista.addEstudiante(nuevoEstudiante);
      this.closeModal();
    }
  }
  
}