import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="report-box">
      <h3>Reporte Final</h3>

      <p *ngIf="!ia">Aún no hay datos generados por IA.</p>

      <div *ngIf="ia">
        <p><strong>Nota Final:</strong> {{ ia.score }} / 20</p>
        <p><strong>Recomendaciones:</strong> {{ ia.reco }}</p>

        <button class="btn" (click)="downloadPDF()">📄 Descargar PDF</button>
      </div>
    </div>
  `,
  styles: [`
    .report-box {
      background: white;
      padding: 16px;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    }
    .btn {
      background: #0a3d62;
      color: white;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 10px;
    }
    .btn:hover {
      opacity: 0.9;
    }
  `]
})
export class ReportComponent {
  @Input() studentId!: number|null;
  @Input() ia: any = null;

  downloadPDF() {
    if (!this.ia) return;

    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(18);
    doc.text('Reporte Final', 10, 15);

    doc.setFontSize(12);
    doc.text(`Alumno ID: ${this.studentId}`, 10, 30);

    doc.text(`Nota Final: ${this.ia.score} / 20`, 10, 45);

    doc.text('Recomendaciones:', 10, 60);
    doc.text(this.ia.reco, 10, 70, { maxWidth: 180 });

    // Fecha
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 10, 120);

    // Guardar
    doc.save(`reporte_alumno_${this.studentId}.pdf`);
  }
}
