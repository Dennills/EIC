import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-professor-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './professor-layout.component.html',
  styleUrls: ['./professor-layout.component.css']
})
export class ProfessorLayoutComponent implements OnInit {
  professorName = '';
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    
    if (user && user.role === 'professor') {
      this.professorName = user.username;
    } else {
      console.warn('Usuario no autorizado o no es profesor');
      this.router.navigate(['/login']);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    // Cerrar sesión directamente sin confirmación
    this.authService.logout();
  }
}

