import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Si ya está autenticado, redirigir según su rol
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.redirectByRole(currentUser.role);
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    console.log('Formulario enviado:', this.username, this.password);

    // Validaciones básicas
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.isLoading = false;
      return;
    }

    // Intentar login
    setTimeout(() => {
      const success = this.authService.login(this.username.trim(), this.password.trim());
      
      console.log('Resultado del login:', success);
      
      if (!success) {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.password = '';
      }
      
      this.isLoading = false;
    }, 800);
  }

  private redirectByRole(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'professor':
        this.router.navigate(['/professor/courses']);
        break;
      case 'student':
        this.router.navigate(['/student']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}

