import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'professor' | 'student';
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';
  
  constructor(private router: Router) {
    this.initializeUsers();
  }

  /**
   * Inicializa usuarios por defecto si no existen
   */
  private initializeUsers(): void {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUsers: User[] = [
        { 
          id: 1, 
          username: 'admin', 
          password: '123', 
          role: 'admin',
          email: 'admin@eic.edu'
        },
        { 
          id: 2, 
          username: 'profesor', 
          password: '123', 
          role: 'professor',
          email: 'profesor@eic.edu'
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
      console.log('Usuarios inicializados:', defaultUsers);
    }
  }

  /**
   * Obtiene todos los usuarios registrados
   */
  private getUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Obtiene el usuario actualmente logueado
   */
  get currentUser(): User | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Verifica si hay un usuario logueado
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  /**
   * Intenta iniciar sesión con las credenciales proporcionadas
   */
  login(username: string, password: string): boolean {
    console.log('Intentando login con:', username, password);
    const users = this.getUsers();
    console.log('Usuarios en localStorage:', users);
    
    const user = users.find(
      u => u.username === username && u.password === password
    );

    console.log('Usuario encontrado:', user);

    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      console.log('Usuario guardado, redirigiendo a:', user.role);
      this.redirectByRole(user.role);
      return true;
    }

    console.log('Usuario no encontrado');
    return false;
  }

  /**
   * Redirige al usuario según su rol
   */
  private redirectByRole(role: string): void {
    console.log('Redirigiendo rol:', role);
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

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Actualiza los datos del usuario actual
   */
  updateCurrentUser(userData: Partial<User>): boolean {
    const currentUser = this.currentUser;
    if (!currentUser) return false;

    // Actualizar en la lista de usuarios
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      // Actualizar datos
      users[userIndex] = { ...users[userIndex], ...userData };
      
      // Guardar en localStorage
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
      
      return true;
    }

    return false;
  }

  /**
   * Registra un nuevo usuario (solo para admin)
   */
  registerUser(user: Omit<User, 'id'>): boolean {
    const users = this.getUsers();
    
    // Verificar si el username ya existe
    if (users.some(u => u.username === user.username)) {
      return false;
    }

    // Crear nuevo usuario con ID único
    const newUser: User = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    
    return true;
  }

  /**
   * Obtiene un usuario por ID
   */
  getUserById(id: number): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  }

  /**
   * Elimina un usuario por ID
   */
  deleteUser(id: number): boolean {
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    
    if (filteredUsers.length < users.length) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
      return true;
    }
    
    return false;
  }
}

