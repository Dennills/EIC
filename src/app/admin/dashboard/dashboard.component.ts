import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalCourses: 12,
    totalStudents: 250,
    totalProfessors: 18,
    activeEvaluations: 45,
    coursesGrowth: '+15%',
    studentsGrowth: '+23%',
    professorsGrowth: '+8%',
    evaluationsGrowth: '+12%'
  };

  recentCourses = [
    { id: 1, name: 'Prácticas Preprofesionales', students: 45, professor: 'Dr. García', status: 'Activo' },
    { id: 2, name: 'Control y Calidad de Software', students: 38, professor: 'Dra. Martínez', status: 'Activo' },
    { id: 3, name: 'Sistemas Distribuidos', students: 42, professor: 'Dr. López', status: 'Activo' },
    { id: 4, name: 'Inteligencia Artificial', students: 35, professor: 'Dra. Rodríguez', status: 'Activo' }
  ];

  recentActivity = [
    { icon: '📚', text: 'Nuevo curso "Machine Learning" creado', time: 'Hace 2 horas', type: 'course' },
    { icon: '👥', text: '15 estudiantes registrados en "Bases de Datos"', time: 'Hace 3 horas', type: 'student' },
    { icon: '👨‍🏫', text: 'Profesor Juan García agregado al sistema', time: 'Hace 5 horas', type: 'professor' },
    { icon: '✅', text: '20 evaluaciones completadas hoy', time: 'Hace 6 horas', type: 'evaluation' },
    { icon: '⚙️', text: 'Configuración del sistema actualizada', time: 'Ayer', type: 'system' }
  ];

  quickActions = [
    { icon: '➕', title: 'Crear Curso', description: 'Agregar nuevo curso', route: '/admin/courses/create', color: '#667eea' },
    { icon: '👤', title: 'Agregar Estudiante', description: 'Registrar estudiante', route: '/admin/students/create', color: '#10b981' },
    { icon: '👨‍🏫', title: 'Agregar Profesor', description: 'Registrar profesor', route: '/admin/professors/create', color: '#f59e0b' },
    { icon: '📊', title: 'Ver Reportes', description: 'Análisis y estadísticas', route: '/admin/reports', color: '#ef4444' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Dashboard cargado');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  viewCourse(courseId: number) {
    this.router.navigate(['/admin/courses/edit', courseId]);
  }
}
