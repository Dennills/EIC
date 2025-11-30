import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-container">
      <h1>✏️ Editar Estudiante</h1>
      
      <div class="form-card">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" [(ngModel)]="student.name" name="name">
        </div>

        <div class="form-group">
          <label>Código</label>
          <input type="text" [(ngModel)]="student.code" name="code">
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="student.email" name="email">
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="cancel()">Cancelar</button>
          <button type="button" class="btn-save" (click)="saveStudent()">💾 Guardar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .edit-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .edit-container h1 {
      font-size: 32px;
      color: #1e3a5f;
      margin-bottom: 24px;
    }

    .form-card {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 16px;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 2px solid #f1f5f9;
    }

    .btn-cancel,
    .btn-save {
      flex: 1;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-cancel {
      background: #f1f5f9;
      color: #64748b;
    }

    .btn-save {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .btn-save:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
    }
  `]
})
export class StudentEditComponent implements OnInit {
  studentId!: number;
  student = {
    name: '',
    code: '',
    email: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent();
  }

  loadStudent() {
    // Simular carga de datos
    this.student = {
      name: 'Juan Pérez',
      code: '20210001',
      email: 'juan@eic.edu'
    };
  }

  saveStudent() {
    console.log('Estudiante actualizado:', this.student);
    alert('✅ Estudiante actualizado exitosamente');
    this.router.navigate(['/admin/students']);
  }

  cancel() {
    this.router.navigate(['/admin/students']);
  }
}
