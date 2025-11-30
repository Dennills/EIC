import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing = false;
  editForm = {
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  saveMessage = '';
  errorMessage = '';

  // Estadísticas del profesor
  stats = {
    totalCourses: 3,
    totalStudents: 60,
    pendingEvaluations: 5,
    completedEvaluations: 45
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
    
    if (!this.user || this.user.role !== 'professor') {
      console.warn('Usuario no autorizado');
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadUserData();
  }

  loadUserData() {
    if (!this.user) return;
    
    this.editForm.username = this.user.username;
    this.editForm.email = this.user.email || 'profesor@eic.edu';
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.saveMessage = '';
    this.errorMessage = '';
    
    if (!this.isEditing) {
      this.loadUserData();
      this.editForm.currentPassword = '';
      this.editForm.newPassword = '';
      this.editForm.confirmPassword = '';
    }
  }

  saveProfile() {
    this.saveMessage = '';
    this.errorMessage = '';

    // Validaciones
    if (!this.editForm.username.trim()) {
      this.errorMessage = 'El nombre de usuario es requerido';
      return;
    }

    if (this.editForm.newPassword) {
      if (this.editForm.newPassword.length < 6) {
        this.errorMessage = 'La nueva contraseña debe tener al menos 6 caracteres';
        return;
      }
      if (this.editForm.newPassword !== this.editForm.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
      if (!this.editForm.currentPassword) {
        this.errorMessage = 'Debes ingresar tu contraseña actual para cambiarla';
        return;
      }
      // Verificar contraseña actual
      if (this.user && this.editForm.currentPassword !== this.user.password) {
        this.errorMessage = 'La contraseña actual es incorrecta';
        return;
      }
    }

    // Preparar datos a actualizar
    const updateData: any = {
      username: this.editForm.username,
      email: this.editForm.email
    };

    if (this.editForm.newPassword) {
      updateData.password = this.editForm.newPassword;
    }

    // Actualizar usuario
    const success = this.authService.updateCurrentUser(updateData);

    if (success) {
      // Recargar datos del usuario
      this.user = this.authService.currentUser;
      
      this.saveMessage = '✅ Perfil actualizado correctamente';
      this.isEditing = false;
      this.editForm.currentPassword = '';
      this.editForm.newPassword = '';
      this.editForm.confirmPassword = '';

      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    } else {
      this.errorMessage = 'Error al actualizar el perfil';
    }
  }

  getInitials(): string {
    return this.user?.username?.charAt(0).toUpperCase() || 'P';
  }
}
