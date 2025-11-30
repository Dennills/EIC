import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  courseId!: number;
  course = {
    name: '',
    code: '',
    description: '',
    credits: 3,
    semester: '2024-I'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    // Simular carga de datos
    this.course = {
      name: 'Prácticas Preprofesionales',
      code: 'PP-2024',
      description: 'Curso de prácticas preprofesionales',
      credits: 4,
      semester: '2024-I'
    };
  }

  saveCourse() {
    console.log('Curso actualizado:', this.course);
    alert('✅ Curso actualizado exitosamente');
    this.router.navigate(['/admin/courses']);
  }

  cancel() {
    this.router.navigate(['/admin/courses']);
  }
}