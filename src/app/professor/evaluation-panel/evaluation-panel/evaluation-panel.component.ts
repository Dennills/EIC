import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from '../../modules/uploads/upload.component';
import { IaComponent } from '../../modules/ia/ia.component';
import { ReportComponent } from '../../modules/report/report.component';

@Component({
  selector: 'app-evaluation-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadComponent, IaComponent, ReportComponent],
  templateUrl: './evaluation-panel.component.html',
  styleUrls: ['./evaluation-panel.component.css']
})
export class EvaluationPanelComponent implements OnInit {
  courseId: number = 0;
  studentId: number = 0;
  studentName: string = '';
  courseName: string = 'Prácticas Preprofesionales';
  
  // Estados del flujo
  pdfsReady = false;
  pdfContents: string[] = [];
  totalPdfs = 0;
  iaReady = false;
  iaResult: any = null;

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId') || 0);
    this.studentId = Number(this.route.snapshot.paramMap.get('studentId') || 0);
    this.loadStudentInfo();
  }

  loadStudentInfo() {
    const student = this.students.find(s => s.id === this.studentId);
    if (student) {
      this.studentName = student.name;
    }
  }

  onPDFReady(data: any) {
    console.log('📄 PDFs listos:', data);
    this.pdfsReady = data.ready;
    this.pdfContents = data.contents;
    this.totalPdfs = data.total || data.contents.length;
    
    // Auto scroll al panel de IA
    setTimeout(() => {
      document.getElementById('ia-panel')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 300);
  }

  onIAFinished(data: any) {
    console.log('✅ Análisis IA completado:', data);
    this.iaResult = data;
    this.iaReady = true;

    // Auto scroll al reporte
    setTimeout(() => {
      document.getElementById('report-panel')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 300);
  }

  goBack() {
    this.router.navigate(['/professor/courses', this.courseId]);
  }
}
