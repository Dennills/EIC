import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  courses = [
    { id: 1, name: 'Practica Preprofesionales' },
    { id: 2, name: 'Gestion y analisis de datos' },
    { id: 3, name: 'Bases de Datos II' }
  ];

  constructor(private router: Router, ) {}

  openCourse(id: number) {
    this.router.navigate(['/professor/courses', id]);
  }
}

