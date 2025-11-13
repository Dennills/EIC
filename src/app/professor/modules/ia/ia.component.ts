import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ia-panel">
      <h3>Analizar con IA</h3>

      <p *ngIf="!studentId">Selecciona un alumno</p>

      <div *ngIf="studentId">
        <button class="primary" (click)="runAnalysis()">Ejecutar análisis IA</button>

        <div *ngIf="analysis">
          <h4>Resultado IA</h4>
          <p><strong>Nota:</strong> {{ analysis.score }}</p>
          <p><strong>Recomendación:</strong> {{ analysis.reco }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ia-panel { background:white; padding:16px; border-radius:10px; box-shadow:0 6px 18px rgba(10,20,40,0.05); }
    .primary { background:#0a3d62; color:white; padding:8px 14px; border-radius:8px; border:none; cursor:pointer; margin-bottom:10px; }
  `]
})
export class IaComponent {

  @Input() studentId!: number | null;

  // ✅ evento OUT → enviará los datos al padre
  @Output() done = new EventEmitter<any>();

  analysis: any = null;

  async runAnalysis() {

    await new Promise(r => setTimeout(r, 900));

    // ✅ MOCK RESULT REAL
    this.analysis = {
      score: (Math.random()*4 + 16).toFixed(2),
      reco: "Mejorar estructura y argumentación."
    };

    // ✅ enviar análisis al componente padre
    this.done.emit(this.analysis);
  }
}
