import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: string | null = null;
  private logged = false;
    private userData: any = {
    id: 1,
    name: ' Jesus Andres Lujan Contreras ',
    email: 'jesusandreslujan@unfv.edu.pe',
    role: 'profesor'
  };

  login(username: string, password: string): boolean {
    if (username === 'profesor' && password === '123') {
      this.logged = true;
      this.role = 'professor';
      return true;
    }

    if (username === 'admin' && password === '123') {
      this.logged = true;
      this.role = 'admin';
      return true;
    }

    return false;
  }

  isLogged(): boolean {
    return this.logged;
  }

  getRole(): string | null {
    return this.role;
  }

  logout() {
    this.logged = false;
    this.role = null;
      localStorage.removeItem('role');
  localStorage.removeItem('token');
  }

    getUserInfo() {
    return this.userData;
  }
}

