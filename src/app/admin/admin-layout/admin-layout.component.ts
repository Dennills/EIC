import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  adminName: string = 'Administrador';
  adminEmail: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.adminEmail = user.email || '';
      this.adminName = user.email?.split('@')[0] || 'Administrador';
    }

    // Redirigir a dashboard si está en la ruta base del admin
    if (this.router.url === '/admin' || this.router.url === '/admin/') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}