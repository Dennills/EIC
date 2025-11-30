import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {
  courseId!: number;
  
  course = {
    id: 0,
    name: '',
    code: '',
    semester: '2025-I',
    students: 0
  };

  students = [
    { id: 1, name: 'Juan Pérez López', code: '20210001' },
    { id: 2, name: 'Lucas Justo Contreras Blas', code: '20210002' },
    { id: 3, name: 'Maria Gracia Aguilar Acosta', code: '20210003' },
    { id: 4, name: 'Cristina Maria Torres Cruz', code: '20210004' },
    { id: 5, name: 'Diego Alejandro Flores Ramirez', code: '20210005' },
    { id: 6, name: 'Carla Rojas Ventura', code: '20210006' },
    { id: 7, name: 'Andrés Carlos Meneses Carrión', code: '20210007' },
    { id: 8, name: 'Jhan Carlos Pardo Fernández', code: '20210008' },
    { id: 9, name: 'Jairo Antonio Aguilar Ccaccya', code: '20210009' },
    { id: 10, name: 'Diego Jairo Flores Pardo', code: '20210010' },
    { id: 11, name: 'Carlos Alberto Quispe Mendoza', code: '20210011' },
    { id: 12, name: 'María Lucía Flores Vega', code: '20210012' },
    { id: 13, name: 'Diego Alonso Rojas Torres', code: '20210013' },
    { id: 14, name: 'Ana Sofía Chávez Gutiérrez', code: '20210014' },
    { id: 15, name: 'Luis Miguel Gonzales Silva', code: '20210015' },
    { id: 16, name: 'Ricardo Andrés Mendoza Castro', code: '20210016' },
    { id: 17, name: 'Gabriela Ximena Díaz Pardo', code: '20210017' },
    { id: 18, name: 'Javier Mateo Cárdenas Ruiz', code: '20210018' },
    { id: 19, name: 'Valeria Camila Sánchez Paredes', code: '20210019' },
    { id: 20, name: 'Sebastián Jesús Vargas Salas', code: '20210020' }
  ];

  // Power BI
  powerBiUrl = 'https://app.powerbi.com/reportEmbed?reportId=48f6613d-6cd8-4c79-b6f0-0ad063c3d4ec&autoAuth=true&ctid=8dbd6711-3051-4a69-bb5e-8714606711d6'; // 🔹 REEMPLAZA
  safePowerBiUrl: SafeResourceUrl;
  showPowerBI = false;
  
  // Control del reporte
  reportGenerated = false;
  generatingReport = false;

  isPracticasPre = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.safePowerBiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.powerBiUrl);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourse();
    });
  }

  loadCourse() {
    const courses = [
      { id: 1, name: 'Prácticas Preprofesionales', code: 'PP-2025', semester: '2025-I', students: 20 },
      { id: 2, name: 'Programación Web', code: 'PW-301', semester: '2025-I', students: 25 },
      { id: 3, name: 'Base de Datos', code: 'BD-302', semester: '2025-I', students: 22 }
    ];

    const foundCourse = courses.find(c => c.id === this.courseId);
    
    if (foundCourse) {
      this.course = foundCourse;
      this.isPracticasPre = this.isPracticasPreprofesionales();
    }
  }

  isPracticasPreprofesionales(): boolean {
    return this.course?.name?.toLowerCase().includes('practicas preprofesionales') || 
           this.course?.name?.toLowerCase().includes('prácticas preprofesionales');
  }

  // Simula la generación del reporte (3 segundos)
  async generateReport() {
    this.generatingReport = true;
    
    // Simula tiempo de generación
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    this.generatingReport = false;
    this.reportGenerated = true;
    
    console.log('✅ Reporte generado exitosamente');
  }

  togglePowerBI() {
    if (this.reportGenerated) {
      this.showPowerBI = !this.showPowerBI;
    }
  }

  viewAttendance() {
    this.router.navigate(['/professor/courses', this.courseId, 'students']);
  }

  evaluateStudent(studentId: number) {
    this.router.navigate(['/professor/evaluation', this.courseId, studentId]);
  }

  goBack() {
    this.router.navigate(['/professor/courses']);
  }
}
