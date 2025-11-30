import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  student = {
    name: '',
    code: '',
    email: '',
    phone: '',
    address: '',
    status: 'Activo'
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.student.name && this.student.code && this.student.email) {
      // Obtener estudiantes actuales del localStorage
      const studentsData = localStorage.getItem('temp_students');
      const students = studentsData ? JSON.parse(studentsData) : [];
      
      // Agregar nuevo estudiante con ID único
      const newStudent = {
        id: Date.now(),
        ...this.student
      };
      
      students.push(newStudent);
      
      // Guardar en localStorage
      localStorage.setItem('temp_students', JSON.stringify(students));
      
      alert('✅ Estudiante agregado exitosamente');
      this.router.navigate(['/admin/students']);
    } else {
      alert('⚠️ Por favor completa los campos obligatorios');
    }
  }

  cancel() {
    this.router.navigate(['/admin/students']);
  }
}
