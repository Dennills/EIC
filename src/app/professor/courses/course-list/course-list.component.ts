import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Course {
  id: number;
  name: string;
  code: string;
  students: number;
  schedule: string;
  semester: string;
  color: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      name: 'Prácticas Preprofesionales',
      code: 'PP-2025',
      students: 20,
      schedule: 'Lun-Mie 10:00-12:00',
      semester: '2025-I',
      color: '#667eea'
    },
    {
      id: 2,
      name: 'Control y Calidad de Software',
      code: 'CCS-2025',
      students: 20,
      schedule: 'Mar-Jue 14:00-16:00',
      semester: '2025-I',
      color: '#f093fb'
    },
    {
      id: 3,
      name: 'Prospectiva Empresarial',
      code: 'PE-2025',
      students: 20,
      schedule: 'Vie 08:00-12:00',
      semester: '2025-I',
      color: '#4facfe'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  viewCourse(courseId: number) {
    this.router.navigate(['/professor/courses', courseId]);
  }

  getStudentText(count: number): string {
    return count === 1 ? 'estudiante' : 'estudiantes';
  }
}

