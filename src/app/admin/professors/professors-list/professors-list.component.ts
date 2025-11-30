import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-professors-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professors-list.component.html',
  styleUrls: ['./professors-list.component.css']
})
export class ProfessorsListComponent implements OnInit {
  professors: any[] = [];

  baseProfessors = [
    { id: 1, name: 'Dr. Juan García Pérez', code: 'PROF001', email: 'juan.garcia@eic.edu', specialty: 'Ingeniería de Software', courses: 3, status: 'Activo' },
    { id: 2, name: 'Dra. María González López', code: 'PROF002', email: 'maria.gonzalez@eic.edu', specialty: 'Calidad de Software', courses: 2, status: 'Activo' },
    { id: 3, name: 'Dr. Carlos López Ramírez', code: 'PROF003', email: 'carlos.lopez@eic.edu', specialty: 'Sistemas Distribuidos', courses: 2, status: 'Activo' },
    { id: 4, name: 'Dra. Ana Martínez Silva', code: 'PROF004', email: 'ana.martinez@eic.edu', specialty: 'Inteligencia Artificial', courses: 3, status: 'Activo' },
    { id: 5, name: 'Dr. Pedro Sánchez Torres', code: 'PROF005', email: 'pedro.sanchez@eic.edu', specialty: 'Base de Datos', courses: 2, status: 'Activo' },
    { id: 6, name: 'Dra. Laura Fernández Castro', code: 'PROF006', email: 'laura.fernandez@eic.edu', specialty: 'Redes y Comunicaciones', courses: 2, status: 'Activo' },
    { id: 7, name: 'Dr. Diego Ramírez Vega', code: 'PROF007', email: 'diego.ramirez@eic.edu', specialty: 'Seguridad Informática', courses: 3, status: 'Activo' },
    { id: 8, name: 'Dra. Sofía Torres Díaz', code: 'PROF008', email: 'sofia.torres@eic.edu', specialty: 'Desarrollo Web', courses: 2, status: 'Activo' }
  ];

  ngOnInit() {
    this.loadProfessors();
  }

  loadProfessors() {
    this.professors = [...this.baseProfessors];
    
    const tempProfessorsData = localStorage.getItem('temp_professors');
    if (tempProfessorsData) {
      const tempProfessors = JSON.parse(tempProfessorsData);
      this.professors = [...this.professors, ...tempProfessors];
    }
  }

  deleteProfessor(id: number) {
    if (id > 8) {
      if (confirm('¿Estás seguro de eliminar este profesor?')) {
        const tempProfessorsData = localStorage.getItem('temp_professors');
        if (tempProfessorsData) {
          let tempProfessors = JSON.parse(tempProfessorsData);
          tempProfessors = tempProfessors.filter((p: any) => p.id !== id);
          localStorage.setItem('temp_professors', JSON.stringify(tempProfessors));
          this.loadProfessors();
          alert('✅ Profesor eliminado');
        }
      }
    } else {
      alert('⚠️ No se pueden eliminar los profesores del sistema base');
    }
  }
}