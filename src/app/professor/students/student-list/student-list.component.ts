import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  code: string;
  email: string;
  attendance: number;
  lastEvaluation: string;
  average: number;
  fullName: string;
  present: boolean;
}

interface Course {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  courseId: number = 0;
  course: Course | null = null;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  courseName: string = '';
  currentDate: string = '';
  savedSuccessfully: boolean = false;
  showSummary: boolean = false;

  courses: Course[] = [
    { id: 1, name: 'Prácticas Preprofesionales', code: 'PP-2025' },
    { id: 2, name: 'Control y Calidad de Software', code: 'CCS-2025' },
    { id: 3, name: 'Prospectiva Empresarial', code: 'PE-2025' }
  ];

  studentsData: { [key: number]: Student[] } = {
    1: [
      { id: 1, name: 'Juan Pérez López', fullName: 'Juan Pérez López', code: '20210001', email: 'juan.perez@email.com', attendance: 95, lastEvaluation: '20/11/2025', average: 16.5, present: false },
      { id: 2, name: 'Lucas Justo Contreras Blas', fullName: 'Lucas Justo Contreras Blas', code: '20210002', email: 'lucas.contreras@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.2, present: false },
      { id: 3, name: 'Maria Gracia Aguilar Acosta', fullName: 'Maria Gracia Aguilar Acosta', code: '20210003', email: 'maria.aguilar@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 17.0, present: false },
      { id: 4, name: 'Cristina Maria Torres Cruz', fullName: 'Cristina Maria Torres Cruz', code: '20210004', email: 'cristina.torres@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.8, present: false },
      { id: 5, name: 'Diego Alejandro Flores Ramirez', fullName: 'Diego Alejandro Flores Ramirez', code: '20210005', email: 'diego.flores@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.0, present: false },
      { id: 6, name: 'Carla Rojas Ventura', fullName: 'Carla Rojas Ventura', code: '20210006', email: 'carla.rojas@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.5, present: false },
      { id: 7, name: 'Andrés Carlos Meneses Carrión', fullName: 'Andrés Carlos Meneses Carrión', code: '20210007', email: 'andres.meneses@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.2, present: false },
      { id: 8, name: 'Jhan Carlos Pardo Fernández', fullName: 'Jhan Carlos Pardo Fernández', code: '20210008', email: 'jhan.pardo@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 16.3, present: false },
      { id: 9, name: 'Jairo Antonio Aguilar Ccaccya', fullName: 'Jairo Antonio Aguilar Ccaccya', code: '20210009', email: 'jairo.aguilar@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.8, present: false },
      { id: 10, name: 'Diego Jairo Flores Pardo', fullName: 'Diego Jairo Flores Pardo', code: '20210010', email: 'diego.pardo@email.com', attendance: 86, lastEvaluation: '20/11/2025', average: 15.0, present: false },
      { id: 11, name: 'Carlos Alberto Quispe Mendoza', fullName: 'Carlos Alberto Quispe Mendoza', code: '20210011', email: 'carlos.quispe@email.com', attendance: 94, lastEvaluation: '20/11/2025', average: 17.5, present: false },
      { id: 12, name: 'María Lucía Flores Vega', fullName: 'María Lucía Flores Vega', code: '20210012', email: 'maria.flores@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.8, present: false },
      { id: 13, name: 'Diego Alonso Rojas Torres', fullName: 'Diego Alonso Rojas Torres', code: '20210013', email: 'diego.rojas@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.2, present: false },
      { id: 14, name: 'Ana Sofía Chávez Gutiérrez', fullName: 'Ana Sofía Chávez Gutiérrez', code: '20210014', email: 'ana.chavez@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.3, present: false },
      { id: 15, name: 'Luis Miguel Gonzales Silva', fullName: 'Luis Miguel Gonzales Silva', code: '20210015', email: 'luis.gonzales@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 16.9, present: false },
      { id: 16, name: 'Ricardo Andrés Mendoza Castro', fullName: 'Ricardo Andrés Mendoza Castro', code: '20210016', email: 'ricardo.mendoza@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.5, present: false },
      { id: 17, name: 'Gabriela Ximena Díaz Pardo', fullName: 'Gabriela Ximena Díaz Pardo', code: '20210017', email: 'gabriela.diaz@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 15.9, present: false },
      { id: 18, name: 'Javier Mateo Cárdenas Ruiz', fullName: 'Javier Mateo Cárdenas Ruiz', code: '20210018', email: 'javier.cardenas@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.7, present: false },
      { id: 19, name: 'Valeria Camila Sánchez Paredes', fullName: 'Valeria Camila Sánchez Paredes', code: '20210019', email: 'valeria.sanchez@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.3, present: false },
      { id: 20, name: 'Sebastián Jesús Vargas Salas', fullName: 'Sebastián Jesús Vargas Salas', code: '20210020', email: 'sebastian.vargas@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.6, present: false }
    ],
    2: [
      { id: 1, name: 'Juan Pérez López', fullName: 'Juan Pérez López', code: '20210001', email: 'juan.perez@email.com', attendance: 95, lastEvaluation: '20/11/2025', average: 16.5, present: false },
      { id: 2, name: 'Lucas Justo Contreras Blas', fullName: 'Lucas Justo Contreras Blas', code: '20210002', email: 'lucas.contreras@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.2, present: false },
      { id: 3, name: 'Maria Gracia Aguilar Acosta', fullName: 'Maria Gracia Aguilar Acosta', code: '20210003', email: 'maria.aguilar@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 17.0, present: false },
      { id: 4, name: 'Cristina Maria Torres Cruz', fullName: 'Cristina Maria Torres Cruz', code: '20210004', email: 'cristina.torres@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.8, present: false },
      { id: 5, name: 'Diego Alejandro Flores Ramirez', fullName: 'Diego Alejandro Flores Ramirez', code: '20210005', email: 'diego.flores@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.0, present: false },
      { id: 6, name: 'Carla Rojas Ventura', fullName: 'Carla Rojas Ventura', code: '20210006', email: 'carla.rojas@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.5, present: false },
      { id: 7, name: 'Andrés Carlos Meneses Carrión', fullName: 'Andrés Carlos Meneses Carrión', code: '20210007', email: 'andres.meneses@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.2, present: false },
      { id: 8, name: 'Jhan Carlos Pardo Fernández', fullName: 'Jhan Carlos Pardo Fernández', code: '20210008', email: 'jhan.pardo@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 16.3, present: false },
      { id: 9, name: 'Jairo Antonio Aguilar Ccaccya', fullName: 'Jairo Antonio Aguilar Ccaccya', code: '20210009', email: 'jairo.aguilar@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.8, present: false },
      { id: 10, name: 'Diego Jairo Flores Pardo', fullName: 'Diego Jairo Flores Pardo', code: '20210010', email: 'diego.pardo@email.com', attendance: 86, lastEvaluation: '20/11/2025', average: 15.0, present: false },
      { id: 11, name: 'Carlos Alberto Quispe Mendoza', fullName: 'Carlos Alberto Quispe Mendoza', code: '20210011', email: 'carlos.quispe@email.com', attendance: 94, lastEvaluation: '20/11/2025', average: 17.5, present: false },
      { id: 12, name: 'María Lucía Flores Vega', fullName: 'María Lucía Flores Vega', code: '20210012', email: 'maria.flores@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.8, present: false },
      { id: 13, name: 'Diego Alonso Rojas Torres', fullName: 'Diego Alonso Rojas Torres', code: '20210013', email: 'diego.rojas@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.2, present: false },
      { id: 14, name: 'Ana Sofía Chávez Gutiérrez', fullName: 'Ana Sofía Chávez Gutiérrez', code: '20210014', email: 'ana.chavez@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.3, present: false },
      { id: 15, name: 'Luis Miguel Gonzales Silva', fullName: 'Luis Miguel Gonzales Silva', code: '20210015', email: 'luis.gonzales@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 16.9, present: false },
      { id: 16, name: 'Ricardo Andrés Mendoza Castro', fullName: 'Ricardo Andrés Mendoza Castro', code: '20210016', email: 'ricardo.mendoza@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.5, present: false },
      { id: 17, name: 'Gabriela Ximena Díaz Pardo', fullName: 'Gabriela Ximena Díaz Pardo', code: '20210017', email: 'gabriela.diaz@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 15.9, present: false },
      { id: 18, name: 'Javier Mateo Cárdenas Ruiz', fullName: 'Javier Mateo Cárdenas Ruiz', code: '20210018', email: 'javier.cardenas@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.7, present: false },
      { id: 19, name: 'Valeria Camila Sánchez Paredes', fullName: 'Valeria Camila Sánchez Paredes', code: '20210019', email: 'valeria.sanchez@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.3, present: false },
      { id: 20, name: 'Sebastián Jesús Vargas Salas', fullName: 'Sebastián Jesús Vargas Salas', code: '20210020', email: 'sebastian.vargas@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.6, present: false }
    ],
    3: [
      { id: 1, name: 'Juan Pérez López', fullName: 'Juan Pérez López', code: '20210001', email: 'juan.perez@email.com', attendance: 95, lastEvaluation: '20/11/2025', average: 16.5, present: false },
      { id: 2, name: 'Lucas Justo Contreras Blas', fullName: 'Lucas Justo Contreras Blas', code: '20210002', email: 'lucas.contreras@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.2, present: false },
      { id: 3, name: 'Maria Gracia Aguilar Acosta', fullName: 'Maria Gracia Aguilar Acosta', code: '20210003', email: 'maria.aguilar@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 17.0, present: false },
      { id: 4, name: 'Cristina Maria Torres Cruz', fullName: 'Cristina Maria Torres Cruz', code: '20210004', email: 'cristina.torres@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.8, present: false },
      { id: 5, name: 'Diego Alejandro Flores Ramirez', fullName: 'Diego Alejandro Flores Ramirez', code: '20210005', email: 'diego.flores@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.0, present: false },
      { id: 6, name: 'Carla Rojas Ventura', fullName: 'Carla Rojas Ventura', code: '20210006', email: 'carla.rojas@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.5, present: false },
      { id: 7, name: 'Andrés Carlos Meneses Carrión', fullName: 'Andrés Carlos Meneses Carrión', code: '20210007', email: 'andres.meneses@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.2, present: false },
      { id: 8, name: 'Jhan Carlos Pardo Fernández', fullName: 'Jhan Carlos Pardo Fernández', code: '20210008', email: 'jhan.pardo@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 16.3, present: false },
      { id: 9, name: 'Jairo Antonio Aguilar Ccaccya', fullName: 'Jairo Antonio Aguilar Ccaccya', code: '20210009', email: 'jairo.aguilar@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.8, present: false },
      { id: 10, name: 'Diego Jairo Flores Pardo', fullName: 'Diego Jairo Flores Pardo', code: '20210010', email: 'diego.pardo@email.com', attendance: 86, lastEvaluation: '20/11/2025', average: 15.0, present: false },
      { id: 11, name: 'Carlos Alberto Quispe Mendoza', fullName: 'Carlos Alberto Quispe Mendoza', code: '20210011', email: 'carlos.quispe@email.com', attendance: 94, lastEvaluation: '20/11/2025', average: 17.5, present: false },
      { id: 12, name: 'María Lucía Flores Vega', fullName: 'María Lucía Flores Vega', code: '20210012', email: 'maria.flores@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.8, present: false },
      { id: 13, name: 'Diego Alonso Rojas Torres', fullName: 'Diego Alonso Rojas Torres', code: '20210013', email: 'diego.rojas@email.com', attendance: 90, lastEvaluation: '20/11/2025', average: 16.2, present: false },
      { id: 14, name: 'Ana Sofía Chávez Gutiérrez', fullName: 'Ana Sofía Chávez Gutiérrez', code: '20210014', email: 'ana.chavez@email.com', attendance: 87, lastEvaluation: '20/11/2025', average: 15.3, present: false },
      { id: 15, name: 'Luis Miguel Gonzales Silva', fullName: 'Luis Miguel Gonzales Silva', code: '20210015', email: 'luis.gonzales@email.com', attendance: 92, lastEvaluation: '20/11/2025', average: 16.9, present: false },
      { id: 16, name: 'Ricardo Andrés Mendoza Castro', fullName: 'Ricardo Andrés Mendoza Castro', code: '20210016', email: 'ricardo.mendoza@email.com', attendance: 85, lastEvaluation: '20/11/2025', average: 14.5, present: false },
      { id: 17, name: 'Gabriela Ximena Díaz Pardo', fullName: 'Gabriela Ximena Díaz Pardo', code: '20210017', email: 'gabriela.diaz@email.com', attendance: 89, lastEvaluation: '20/11/2025', average: 15.9, present: false },
      { id: 18, name: 'Javier Mateo Cárdenas Ruiz', fullName: 'Javier Mateo Cárdenas Ruiz', code: '20210018', email: 'javier.cardenas@email.com', attendance: 91, lastEvaluation: '20/11/2025', average: 16.7, present: false },
      { id: 19, name: 'Valeria Camila Sánchez Paredes', fullName: 'Valeria Camila Sánchez Paredes', code: '20210019', email: 'valeria.sanchez@email.com', attendance: 93, lastEvaluation: '20/11/2025', average: 17.3, present: false },
      { id: 20, name: 'Sebastián Jesús Vargas Salas', fullName: 'Sebastián Jesús Vargas Salas', code: '20210020', email: 'sebastian.vargas@email.com', attendance: 88, lastEvaluation: '20/11/2025', average: 15.6, present: false }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourse();
      this.loadStudents();
      this.setCurrentDate();
    });
  }

  loadCourse() {
    this.course = this.courses.find(c => c.id === this.courseId) || null;
    this.courseName = this.course?.name || '';
  }

  loadStudents() {
    this.students = this.studentsData[this.courseId] || [];
    this.filteredStudents = [...this.students];
  }

  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.currentDate = today.toLocaleDateString('es-ES', options);
  }

  filterStudents() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredStudents = [...this.students];
      return;
    }

    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.code.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term)
    );
  }

  toggleAttendance(student: Student) {
    student.present = !student.present;
  }

  selectAll() {
    this.students.forEach(student => student.present = true);
  }

  deselectAll() {
    this.students.forEach(student => student.present = false);
  }

  getPresentCount(): number {
    return this.students.filter(s => s.present).length;
  }

  getAbsentCount(): number {
    return this.students.filter(s => !s.present).length;
  }

  getAttendancePercentage(): number {
    if (this.students.length === 0) return 0;
    return Math.round((this.getPresentCount() / this.students.length) * 100);
  }

  saveAttendance() {
    console.log('Guardando asistencia...');
    console.log('Presentes:', this.getPresentCount());
    console.log('Ausentes:', this.getAbsentCount());
    
    this.savedSuccessfully = true;
    this.showSummary = true;

    setTimeout(() => {
      this.savedSuccessfully = false;
    }, 3000);
  }

  resetAttendance() {
    this.deselectAll();
    this.showSummary = false;
  }

  goBack() {
    this.router.navigate(['/professor/courses', this.courseId]);
  }

  evaluateStudent(studentId: number) {
    console.log('Evaluar estudiante:', studentId);
  }

  viewDetails(studentId: number) {
    console.log('Ver detalles del estudiante:', studentId);
  }

  getAttendanceColor(attendance: number): string {
    if (attendance >= 90) return '#10b981';
    if (attendance >= 75) return '#f59e0b';
    return '#ef4444';
  }

  getAverageColor(average: number): string {
    if (average >= 16) return '#10b981';
    if (average >= 13) return '#f59e0b';
    return '#ef4444';
  }
}