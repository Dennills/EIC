import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  selectedCourseId: number | null = null;

  courses = [
    { id: 1, name: 'Prácticas Preprofesionales', code: 'PP-2025-I', professor: 'Dr. Juan García', students: 20 },
    { id: 2, name: 'Control y Calidad de Software', code: 'CCS-2025-I', professor: 'Dra. María González', students: 18 },
    { id: 3, name: 'Sistemas Distribuidos', code: 'SD-2025-I', professor: 'Dr. Carlos López', students: 22 },
    { id: 4, name: 'Inteligencia Artificial', code: 'IA-2025-I', professor: 'Dra. Ana Martínez', students: 16 }
  ];

  mockStudents = [
    { code: '20210001', name: 'Juan Pérez García', technical: 19, attitudes: 20, communication: 19, average: 19.5 },
    { code: '20210002', name: 'María González López', technical: 19, attitudes: 20, communication: 18, average: 19.2 },
    { code: '20210003', name: 'Carlos Rodríguez Sánchez', technical: 18, attitudes: 19, communication: 19, average: 18.8 },
    { code: '20210004', name: 'Ana Martínez Flores', technical: 18, attitudes: 19, communication: 18, average: 18.5 },
    { code: '20210005', name: 'Pedro López Ramírez', technical: 17, attitudes: 18, communication: 18, average: 17.8 },
    { code: '20210006', name: 'Laura Sánchez Torres', technical: 17, attitudes: 18, communication: 17, average: 17.5 },
    { code: '20210007', name: 'Diego Fernández Castro', technical: 16, attitudes: 17, communication: 17, average: 16.8 },
    { code: '20210008', name: 'Sofía Ramírez Vega', technical: 16, attitudes: 17, communication: 16, average: 16.5 },
    { code: '20210009', name: 'Miguel Torres Díaz', technical: 15, attitudes: 16, communication: 16, average: 15.8 },
    { code: '20210010', name: 'Valentina Castro Mendoza', technical: 15, attitudes: 16, communication: 15, average: 15.5 },
    { code: '20210011', name: 'Andrés Mendoza Silva', technical: 14, attitudes: 15, communication: 15, average: 14.8 },
    { code: '20210012', name: 'Camila Silva Ruiz', technical: 14, attitudes: 15, communication: 14, average: 14.5 },
    { code: '20210013', name: 'Sebastián Ruiz Ortiz', technical: 13, attitudes: 14, communication: 14, average: 13.8 },
    { code: '20210014', name: 'Isabella Ortiz Morales', technical: 13, attitudes: 14, communication: 13, average: 13.5 },
    { code: '20210015', name: 'Mateo Morales Herrera', technical: 12, attitudes: 13, communication: 13, average: 12.8 },
    { code: '20210016', name: 'Lucía Herrera Gutiérrez', technical: 12, attitudes: 13, communication: 12, average: 12.5 },
    { code: '20210017', name: 'Emilio Gutiérrez Paredes', technical: 11, attitudes: 12, communication: 12, average: 11.8 },
    { code: '20210018', name: 'Martina Paredes Ríos', technical: 11, attitudes: 12, communication: 11, average: 11.5 },
    { code: '20210019', name: 'Joaquín Ríos Vargas', technical: 10, attitudes: 11, communication: 11, average: 10.8 },
    { code: '20210020', name: 'Emma Vargas Reyes', technical: 10, attitudes: 11, communication: 10, average: 10.5 }
  ];

  selectCourse(courseId: number) {
    this.selectedCourseId = courseId;
  }

  getSelectedCourse() {
    return this.courses.find(c => c.id === this.selectedCourseId);
  }

  goBack() {
    this.selectedCourseId = null;
  }
}
