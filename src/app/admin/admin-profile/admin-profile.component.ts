import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin = {
    name: 'Administrador',
    email: 'admin@eic.edu',
    role: 'Administrador',
    memberSince: 'Noviembre 2024'
  };

  stats = {
    totalCourses: 12,
    totalStudents: 250,
    totalProfessors: 18,
    activeEvaluations: 45
  };

  recentActivity = [
    { icon: '📚', text: 'Curso "Prácticas Preprofesionales" creado', time: 'Hace 2 horas' },
    { icon: '👥', text: '15 estudiantes registrados', time: 'Hace 5 horas' },
    { icon: '👨‍🏫', text: 'Profesor Juan García agregado', time: 'Ayer' },
    { icon: '⚙️', text: 'Configuración del sistema actualizada', time: 'Hace 2 días' }
  ];

  editing = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.admin.email = user.email || 'admin@eic.edu';
      this.admin.name = user.email?.split('@')[0] || 'Administrador';
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveProfile() {
    this.editing = false;
    console.log('Perfil actualizado:', this.admin);
    alert('✅ Perfil actualizado correctamente');
  }
}