import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenAIService } from '../../../services/openai.service';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ia-panel">
      <h3>🤖 Análisis con Inteligencia Artificial (ChatGPT)</h3>

      <div *ngIf="!studentId || !pdfsReady" class="info-box">
        <p>{{ !studentId ? '👤 Primero selecciona un alumno' : '📄 Sube las 4 rúbricas PDF primero' }}</p>
      </div>

      <div *ngIf="studentId && pdfsReady && !analyzing && !analysis">
        <p class="ready-msg">✅ Listo para analizar {{ totalPdfs }} rúbrica(s) con ChatGPT</p>
        <p class="info-text">Se analizarán los formularios marcados con X (escala 1-5)</p>
        <button class="analyze-btn" (click)="runAnalysis()">
          🚀 Ejecutar Análisis con ChatGPT ({{ totalPdfs }} Rúbricas)
        </button>
      </div>

      <div *ngIf="analyzing" class="loading">
        <div class="spinner"></div>
        <p class="loading-text">🔍 Analizando con ChatGPT...</p>
        <p class="progress">{{ progressMessage }}</p>
        <p class="current-rubric">{{ currentRubric }}</p>
      </div>

      <div *ngIf="analysis && !analyzing" class="results">
        <h4 class="success-title">✅ Análisis Completado con ChatGPT</h4>
        
        <!-- Resultados por rúbrica -->
        <div class="rubric-result" *ngFor="let rubric of analysis.rubrics; let i = index">
          <div class="rubric-header">
            <h5>📄 Rúbrica {{ rubric.rubricNumber }}</h5>
            <span class="score-badge">{{ rubric.score }}/20</span>
          </div>
          
          <div class="rubric-content">
            <!-- Criterios evaluados -->
            <div class="criteria-box" *ngIf="rubric.criteriaEvaluated && rubric.criteriaEvaluated.length > 0">
              <strong>📋 Criterios Evaluados:</strong>
              <div class="criteria-list">
                <div class="criterion-item" *ngFor="let criterion of rubric.criteriaEvaluated">
                  <span class="criterion-name">{{ criterion.name }}</span>
                  <span class="criterion-level" [class]="'level-' + criterion.level">
                    Nivel: {{ criterion.level }}/5
                  </span>
                </div>
              </div>
            </div>

            <div class="observation-box">
              <strong>💡 Observaciones:</strong>
              <p>{{ rubric.observations }}</p>
            </div>
            
            <div class="recommendations-box">
              <strong>✅ Recomendaciones:</strong>
              <ul>
                <li *ngFor="let rec of rubric.recommendations">{{ rec }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Resumen Final -->
        <div class="final-summary">
          <h4>📊 Resumen Final ({{ analysis.rubrics.length }} Rúbricas Analizadas)</h4>
          <p class="final-score">
            Nota Final: <strong>{{ analysis.finalScore }}/20</strong>
          </p>
          <div class="summary-content">
            <p><strong>Resumen:</strong> {{ analysis.executiveSummary }}</p>
          </div>
        </div>
      </div>

      <p *ngIf="error" class="error">⚠️ {{ error }}</p>
    </div>
  `,
  styles: [`
    .ia-panel {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(10,20,40,0.06);
    }
    h3 {
      color: #0a3d62;
      margin-bottom: 20px;
      font-size: 22px;
    }
    .info-box {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
    }
    .info-box p {
      margin: 0;
      color: #856404;
      font-weight: 600;
    }
    .ready-msg {
      background: #d4edda;
      color: #155724;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
    }
    .info-text {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .analyze-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 28px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      font-size: 17px;
      font-weight: 600;
      width: 100%;
      transition: 0.3s;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .analyze-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    .loading {
      text-align: center;
      padding: 30px 20px;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .loading-text {
      font-size: 18px;
      font-weight: 600;
      color: #0a3d62;
      margin-bottom: 10px;
    }
    .progress {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
    .current-rubric {
      color: #667eea;
      font-weight: 600;
      margin-top: 10px;
      font-size: 15px;
    }
    .results {
      margin-top: 20px;
    }
    .success-title {
      color: #4caf50;
      font-size: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .rubric-result {
      background: #f8f9fa;
      border-radius: 10px;
      margin-bottom: 20px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .rubric-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .rubric-header h5 {
      margin: 0;
      font-size: 18px;
    }
    .score-badge {
      background: rgba(255,255,255,0.2);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .rubric-content {
      padding: 20px;
    }
    .criteria-box {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .criteria-box strong {
      display: block;
      color: #0a3d62;
      margin-bottom: 10px;
      font-size: 15px;
    }
    .criteria-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .criterion-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 8px 12px;
      border-radius: 6px;
    }
    .criterion-name {
      flex: 1;
      color: #555;
      font-size: 14px;
    }
    .criterion-level {
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 13px;
    }
    .level-1 { background: #ffebee; color: #c62828; }
    .level-2 { background: #ffe0b2; color: #ef6c00; }
    .level-3 { background: #fff9c4; color: #f57f17; }
    .level-4 { background: #c8e6c9; color: #2e7d32; }
    .level-5 { background: #b2dfdb; color: #00695c; }
    .observation-box, .recommendations-box {
      margin-bottom: 15px;
    }
    .observation-box strong, .recommendations-box strong {
      display: block;
      color: #0a3d62;
      margin-bottom: 8px;
      font-size: 15px;
    }
    .observation-box p {
      color: #555;
      line-height: 1.6;
    }
    .recommendations-box ul {
      margin: 0;
      padding-left: 20px;
      color: #555;
    }
    .recommendations-box li {
      margin-bottom: 6px;
      line-height: 1.5;
    }
    .final-summary {
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      padding: 24px;
      border-radius: 12px;
      margin-top: 25px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .final-summary h4 {
      color: #0a3d62;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .final-score {
      font-size: 18px;
      color: #1976d2;
      margin-bottom: 15px;
    }
    .final-score strong {
      font-size: 28px;
      font-weight: bold;
      color: #0d47a1;
    }
    .summary-content {
      background: white;
      padding: 15px;
      border-radius: 8px;
      line-height: 1.6;
      color: #555;
    }
    .error {
      color: #d32f2f;
      background: #ffebee;
      padding: 12px;
      border-radius: 8px;
      margin-top: 15px;
      font-weight: 600;
    }
  `]
})
export class IaComponent {
  @Input() studentId!: number | null;
  @Input() pdfsReady: boolean = false;
  @Input() pdfContents: string[] = [];
  @Input() totalPdfs: number = 0;
  @Output() done = new EventEmitter<any>();

  analyzing = false;
  analysis: any = null;
  error = '';
  progressMessage = '';
  currentRubric = '';

  constructor(private openai: OpenAIService) {}

  async runAnalysis() {
    const numPdfs = this.pdfContents.length;
    
    if (numPdfs < 3) {
      this.error = 'Debes subir al menos 3 rúbricas antes de analizar';
      return;
    }

    this.analyzing = true;
    this.error = '';
    this.analysis = null;
    this.progressMessage = 'Iniciando análisis con ChatGPT...';
    this.currentRubric = '';

    try {
      const rubricAnalyses = [];

      // Analizar cada rúbrica individualmente con la API real
      for (let i = 0; i < numPdfs; i++) {
        this.currentRubric = `📄 Analizando Rúbrica ${i + 1} de ${numPdfs}...`;
        this.progressMessage = 'Enviando a ChatGPT...';
        
        const result = await this.openai.analyzeRubric(
          this.pdfContents[i],
          i + 1
        );
        
        rubricAnalyses.push(result);
        this.progressMessage = `✅ Rúbrica ${i + 1} analizada: ${result.score}/20`;
        
        // Pausa entre llamadas para evitar rate limits
        await new Promise(r => setTimeout(r, 1500));
      }

      // Generar reporte final consolidado
      this.currentRubric = '';
      this.progressMessage = '📊 Generando reporte final consolidado...';
      
      const finalReport = await this.openai.generateFinalReport(rubricAnalyses);

      this.analysis = {
        rubrics: rubricAnalyses,
        ...finalReport
      };

      console.log('✅ Análisis completo:', this.analysis);
      this.done.emit(this.analysis);
      
    } catch (err: any) {
      this.error = `Error: ${err.message || 'No se pudo completar el análisis con ChatGPT'}`;
      console.error('❌ Error en análisis:', err);
    } finally {
      this.analyzing = false;
      this.progressMessage = '';
      this.currentRubric = '';
    }
  }
}
