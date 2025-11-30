import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];

  // Cursos base del sistema
  baseCourses = [
    { id: 1, name: 'Prácticas Preprofesionales', code: 'PP-2024-I', professor: 'Dr. Juan García', semester: '2024-I', students: 20 },
    { id: 2, name: 'Control y Calidad de Software', code: 'CCS-2024-I', professor: 'Dra. María González', semester: '2024-I', students: 18 },
    { id: 3, name: 'Sistemas Distribuidos', code: 'SD-2024-I', professor: 'Dr. Carlos López', semester: '2024-I', students: 22 },
    { id: 4, name: 'Inteligencia Artificial', code: 'IA-2024-I', professor: 'Dra. Ana Martínez', semester: '2024-I', students: 16 }
  ];

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    // Cargar cursos base
    this.courses = [...this.baseCourses];
    
    // Agregar cursos temporales del localStorage
    const tempCoursesData = localStorage.getItem('temp_courses');
    if (tempCoursesData) {
      const tempCourses = JSON.parse(tempCoursesData);
      this.courses = [...this.courses, ...tempCourses];
    }
  }

  deleteCourse(id: number) {
    // Solo permitir eliminar cursos temporales (id > 4)
    if (id > 4) {
      if (confirm('¿Estás seguro de eliminar este curso?')) {
        const tempCoursesData = localStorage.getItem('temp_courses');
        if (tempCoursesData) {
          let tempCourses = JSON.parse(tempCoursesData);
          tempCourses = tempCourses.filter((c: any) => c.id !== id);
          localStorage.setItem('temp_courses', JSON.stringify(tempCourses));
          this.loadCourses();
          alert('✅ Curso eliminado');
        }
      }
    } else {
      alert('⚠️ No se pueden eliminar los cursos del sistema base');
    }
  }
}