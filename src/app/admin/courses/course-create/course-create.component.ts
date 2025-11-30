import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent {
  course = {
    name: '',
    code: '',
    description: '',
    professor: '',
    semester: '2024-I',
    students: 0
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.course.name && this.course.code) {
      // Obtener cursos actuales del localStorage
      const coursesData = localStorage.getItem('temp_courses');
      const courses = coursesData ? JSON.parse(coursesData) : [];
      
      // Agregar nuevo curso con ID único
      const newCourse = {
        id: Date.now(),
        ...this.course
      };
      
      courses.push(newCourse);
      
      // Guardar en localStorage
      localStorage.setItem('temp_courses', JSON.stringify(courses));
      
      alert('✅ Curso creado exitosamente');
      this.router.navigate(['/admin/courses']);
    } else {
      alert('⚠️ Por favor completa los campos obligatorios');
    }
  }

  cancel() {
    this.router.navigate(['/admin/courses']);
  }
}