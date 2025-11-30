import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: any[] = [];

  // Estudiantes base del sistema
  baseStudents = [
    { id: 1, name: 'Juan Pérez García', code: '20210001', email: 'juan.perez@eic.edu', status: 'Activo' },
    { id: 2, name: 'María González López', code: '20210002', email: 'maria.gonzalez@eic.edu', status: 'Activo' },
    { id: 3, name: 'Carlos Rodríguez Sánchez', code: '20210003', email: 'carlos.rodriguez@eic.edu', status: 'Activo' },
    { id: 4, name: 'Ana Martínez Flores', code: '20210004', email: 'ana.martinez@eic.edu', status: 'Activo' },
    { id: 5, name: 'Pedro López Ramírez', code: '20210005', email: 'pedro.lopez@eic.edu', status: 'Activo' },
    { id: 6, name: 'Laura Sánchez Torres', code: '20210006', email: 'laura.sanchez@eic.edu', status: 'Activo' },
    { id: 7, name: 'Diego Fernández Castro', code: '20210007', email: 'diego.fernandez@eic.edu', status: 'Activo' },
    { id: 8, name: 'Sofía Ramírez Vega', code: '20210008', email: 'sofia.ramirez@eic.edu', status: 'Activo' },
    { id: 9, name: 'Miguel Torres Díaz', code: '20210009', email: 'miguel.torres@eic.edu', status: 'Activo' },
    { id: 10, name: 'Valentina Castro Mendoza', code: '20210010', email: 'valentina.castro@eic.edu', status: 'Activo' },
    { id: 11, name: 'Andrés Mendoza Silva', code: '20210011', email: 'andres.mendoza@eic.edu', status: 'Activo' },
    { id: 12, name: 'Camila Silva Ruiz', code: '20210012', email: 'camila.silva@eic.edu', status: 'Activo' },
    { id: 13, name: 'Sebastián Ruiz Ortiz', code: '20210013', email: 'sebastian.ruiz@eic.edu', status: 'Activo' },
    { id: 14, name: 'Isabella Ortiz Morales', code: '20210014', email: 'isabella.ortiz@eic.edu', status: 'Activo' },
    { id: 15, name: 'Mateo Morales Herrera', code: '20210015', email: 'mateo.morales@eic.edu', status: 'Activo' },
    { id: 16, name: 'Lucía Herrera Gutiérrez', code: '20210016', email: 'lucia.herrera@eic.edu', status: 'Activo' },
    { id: 17, name: 'Emilio Gutiérrez Paredes', code: '20210017', email: 'emilio.gutierrez@eic.edu', status: 'Activo' },
    { id: 18, name: 'Martina Paredes Ríos', code: '20210018', email: 'martina.paredes@eic.edu', status: 'Activo' },
    { id: 19, name: 'Joaquín Ríos Vargas', code: '20210019', email: 'joaquin.rios@eic.edu', status: 'Activo' },
    { id: 20, name: 'Emma Vargas Reyes', code: '20210020', email: 'emma.vargas@eic.edu', status: 'Activo' }
  ];

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    // Cargar estudiantes base
    this.students = [...this.baseStudents];
    
    // Agregar estudiantes temporales del localStorage
    const tempStudentsData = localStorage.getItem('temp_students');
    if (tempStudentsData) {
      const tempStudents = JSON.parse(tempStudentsData);
      this.students = [...this.students, ...tempStudents];
    }
  }

  deleteStudent(id: number) {
    // Solo permitir eliminar estudiantes temporales (id > 20)
    if (id > 20) {
      if (confirm('¿Estás seguro de eliminar este estudiante?')) {
        const tempStudentsData = localStorage.getItem('temp_students');
        if (tempStudentsData) {
          let tempStudents = JSON.parse(tempStudentsData);
          tempStudents = tempStudents.filter((s: any) => s.id !== id);
          localStorage.setItem('temp_students', JSON.stringify(tempStudents));
          this.loadStudents();
          alert('✅ Estudiante eliminado');
        }
      }
    } else {
      alert('⚠️ No se pueden eliminar los estudiantes del sistema base');
    }
  }
}
