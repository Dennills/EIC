import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="report-box">
      <h3>📊 Reporte Final de Evaluación</h3>

      <div *ngIf="ia" class="report-content">
        <div class="score-card">
          <h4>Calificación Final</h4>
          <p class="rubrics-count">{{ ia.rubrics.length }} Rúbricas Evaluadas</p>
          <div class="score">{{ ia.finalScore }} <span class="max">/ 20</span></div>
        </div>

        <div class="section">
          <h4>📝 Resumen Ejecutivo</h4>
          <p>{{ ia.executiveSummary }}</p>
        </div>

        <div class="section strengths">
          <h4>💪 Fortalezas Identificadas</h4>
          <ul>
            <li *ngFor="let s of ia.strengths">{{ s }}</li>
          </ul>
        </div>

        <div class="section improvements">
          <h4>🎯 Áreas de Mejora</h4>
          <ul>
            <li *ngFor="let a of ia.areasForImprovement">{{ a }}</li>
          </ul>
        </div>

        <div class="section recommendations">
          <h4>✅ Recomendaciones Finales</h4>
          <ul>
            <li *ngFor="let r of ia.finalRecommendations">{{ r }}</li>
          </ul>
        </div>

        <button class="download-btn" (click)="downloadPDF()">
          📄 Descargar Reporte en PDF
        </button>
      </div>

      <div *ngIf="!ia" class="no-data">
        <p>⏳ Esperando análisis de IA...</p>
      </div>
    </div>
  `,
  styles: [`
    .report-box {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    }
    h3 {
      color: #0a3d62;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .score-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      margin-bottom: 25px;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    .score-card h4 {
      margin: 0 0 8px 0;
      font-size: 18px;
      opacity: 0.9;
    }
    .rubrics-count {
      margin: 0 0 15px 0;
      font-size: 14px;
      opacity: 0.8;
    }
    .score {
      font-size: 64px;
      font-weight: bold;
      line-height: 1;
    }
    .score .max {
      font-size: 32px;
      opacity: 0.8;
    }
    .section {
      margin-bottom: 24px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      border-left: 5px solid #0a3d62;
    }
    .section h4 {
      color: #0a3d62;
      font-size: 18px;
      margin-bottom: 12px;
    }
    .section p {
      color: #555;
      line-height: 1.7;
      margin: 0;
    }
    .section ul {
      margin: 0;
      padding-left: 20px;
      color: #555;
    }
    .section li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
    .section.strengths {
      border-left-color: #4caf50;
      background: #f1f8f4;
    }
    .section.strengths h4 {
      color: #2e7d32;
    }
    .section.improvements {
      border-left-color: #ff9800;
      background: #fff8e1;
    }
    .section.improvements h4 {
      color: #e65100;
    }
    .section.recommendations {
      border-left-color: #2196f3;
      background: #e3f2fd;
    }
    .section.recommendations h4 {
      color: #1565c0;
    }
    .download-btn {
      background: linear-gradient(135deg, #0a3d62 0%, #145a8d 100%);
      color: white;
      padding: 16px 32px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 17px;
      font-weight: 600;
      width: 100%;
      margin-top: 20px;
      transition: 0.3s;
      box-shadow: 0 4px 15px rgba(10, 61, 98, 0.3);
    }
    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(10, 61, 98, 0.4);
    }
    .no-data {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 16px;
    }
  `]
})
export class ReportComponent {
  @Input() studentId!: number | null;
  @Input() ia: any = null;

  downloadPDF() {
    if (!this.ia) return;

    const doc = new jsPDF();
    let y = 20;

    // Título principal
    doc.setFontSize(24);
    doc.setTextColor(10, 61, 98);
    doc.text('Reporte de Evaluación', 105, y, { align: 'center' });
    y += 12;
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Prácticas Preprofesionales', 105, y, { align: 'center' });
    y += 8;
    doc.text(`${this.ia.rubrics.length} Rúbricas Evaluadas`, 105, y, { align: 'center' });
    y += 18;

    // Info del estudiante
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Alumno ID: ${this.studentId}`, 20, y);
    y += 8;
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, 20, y);
    y += 15;

    // Nota final (destacada)
    doc.setFillColor(102, 126, 234);
    doc.rect(15, y - 5, 180, 20, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(`Nota Final: ${this.ia.finalScore} / 20`, 105, y + 8, { align: 'center' });
    y += 25;

    // Resumen ejecutivo
    doc.setFontSize(16);
    doc.setTextColor(10, 61, 98);
    doc.text('Resumen Ejecutivo', 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const summary = doc.splitTextToSize(this.ia.executiveSummary, 170);
    doc.text(summary, 20, y);
    y += summary.length * 6 + 12;

    // Fortalezas
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(16);
    doc.setTextColor(46, 125, 50);
    doc.text('💪 Fortalezas', 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    this.ia.strengths.forEach((s: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const lines = doc.splitTextToSize(`• ${s}`, 165);
      doc.text(lines, 25, y);
      y += lines.length * 6 + 3;
    });
    y += 8;

    // Áreas de mejora
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(16);
    doc.setTextColor(230, 81, 0);
    doc.text('🎯 Áreas de Mejora', 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    this.ia.areasForImprovement.forEach((a: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const lines = doc.splitTextToSize(`• ${a}`, 165);
      doc.text(lines, 25, y);
      y += lines.length * 6 + 3;
    });
    y += 8;

    // Recomendaciones
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(16);
    doc.setTextColor(21, 101, 192);
    doc.text('✅ Recomendaciones', 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    this.ia.finalRecommendations.forEach((r: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const lines = doc.splitTextToSize(`• ${r}`, 165);
      doc.text(lines, 25, y);
      y += lines.length * 6 + 3;
    });

    // Footer en todas las páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${i} de ${pageCount}`, 105, 285, { align: 'center' });
    }

    // Guardar
    doc.save(`reporte_evaluacion_alumno_${this.studentId}_${this.ia.rubrics.length}rubricas.pdf`);
  }
}
