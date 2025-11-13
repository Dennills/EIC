import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadComponent } from '../../modules/uploads/upload.component';
import { IaComponent } from '../../modules/ia/ia.component';
import { ReportComponent } from '../../modules/report/report.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadComponent, IaComponent, ReportComponent],
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent {
  pdfsReady = false;
  iaReady = false;
  iaResult: any = null;

  courseId = 0;
  courseName = '—';
  students = Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: `Alumno ${i + 1}` }));
  selectedStudentId: number | null = null;

  constructor(private route: ActivatedRoute, private location: Location) {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.courseId = id;
    this.courseName = id ? `Curso #${id}` : 'Curso';
  }

onSelectStudent(id: number) {
  this.selectedStudentId = id;

  // Resetear estado del flujo
  this.pdfsReady = false;
  this.iaReady = false;
  this.iaResult = null;

  // Auto scroll al upload
  setTimeout(() => {
    const el = document.getElementById('upload-panel');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
}

onPDFReady(state: boolean) {
  this.pdfsReady = state;
}

onIAFinished(data: any) {
  this.iaResult = data;
  this.iaReady = true;

  // Auto scroll al reporte
  setTimeout(() => {
    const el = document.getElementById('ia-panel');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
}

  goBack() {
    this.location.back();
  }
}
