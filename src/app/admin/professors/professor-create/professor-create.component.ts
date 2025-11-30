import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.css']
})
export class ProfessorCreateComponent {
  professor = {
    name: '',
    code: '',
    email: '',
    specialty: '',
    courses: 0,
    status: 'Activo'
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.professor.name && this.professor.code && this.professor.email) {
      const professorsData = localStorage.getItem('temp_professors');
      const professors = professorsData ? JSON.parse(professorsData) : [];
      
      const newProfessor = {
        id: Date.now(),
        ...this.professor
      };
      
      professors.push(newProfessor);
      localStorage.setItem('temp_professors', JSON.stringify(professors));
      
      alert('✅ Profesor agregado exitosamente');
      this.router.navigate(['/admin/professors']);
    } else {
      alert('⚠️ Por favor completa los campos obligatorios');
    }
  }

  cancel() {
    this.router.navigate(['/admin/professors']);
  }
}