import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PDFExtractorService } from '../../../services/pdf-extractor.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-panel">
      <h3>📄 Subir Rúbricas PDF (Mínimo 3, Máximo 4)</h3>
      
      <div class="file-row" *ngFor="let f of files; let i = index">
        <label class="file-label">
          📄 Rúbrica {{ i + 1 }} {{ i >= 3 ? '' : '' }}
          <input type="file" accept="application/pdf" (change)="onFileSelect($event, i)" hidden>
        </label>
        <span class="name">{{ fileNames[i] || 'Sin archivo' }}</span>
        <button *ngIf="files[i]" class="remove-btn" (click)="removeFile(i)" title="Quitar archivo">❌</button>
        <span class="status" *ngIf="extractedTexts[i]">✅</span>
      </div>

      <div class="btns" *ngIf="canProcess">
        <button (click)="uploadAll()" class="primary" [disabled]="uploading">
          {{ uploading ? 'Procesando...' : '🚀 Procesar y Extraer Texto (' + selectedFilesCount + ' PDFs)' }}
        </button>
      </div>

      <p class="info-text" *ngIf="!canProcess && selectedFilesCount > 0">
        ⚠️ Has subido {{ selectedFilesCount }} PDF(s). Necesitas mínimo 3 archivos.
      </p>

      <p class="status-msg" *ngIf="message">{{ message }}</p>
      <p class="error" *ngIf="error">❌ {{ error }}</p>
    </div>
  `,
  styles: [`
    .upload-panel {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }
    h3 {
      color: #0a3d62;
      margin-bottom: 20px;
      font-size: 20px;
    }
    .file-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 8px;
      transition: 0.3s;
    }
    .file-row:hover {
      background: #e9ecef;
    }
    .file-label {
      background: #0a3d62;
      color: white;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
      transition: 0.3s;
      white-space: nowrap;
    }
    .file-label:hover {
      background: #145a8d;
      transform: translateY(-1px);
    }
    .name {
      font-size: 14px;
      color: #555;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      transition: 0.3s;
    }
    .remove-btn:hover {
      transform: scale(1.2);
    }
    .status {
      color: #4caf50;
      font-size: 20px;
    }
    .btns {
      margin-top: 20px;
      text-align: center;
    }
    .primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 28px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: 0.3s;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    .primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .info-text {
      margin-top: 15px;
      color: #856404;
      font-weight: 600;
      text-align: center;
      background: #fff3cd;
      padding: 10px;
      border-radius: 8px;
    }
    .status-msg {
      margin-top: 15px;
      color: #4caf50;
      font-weight: 600;
      text-align: center;
      background: #e8f5e9;
      padding: 10px;
      border-radius: 8px;
    }
    .error {
      margin-top: 15px;
      color: #d32f2f;
      font-weight: 600;
      text-align: center;
      background: #ffebee;
      padding: 10px;
      border-radius: 8px;
    }
  `]
})
export class UploadComponent {
  @Input() studentId!: number | null;
  @Output() uploadedChange = new EventEmitter<any>();

  files: (File | null)[] = [null, null, null, null]; // 4 slots
  fileNames = ['', '', '', ''];
  extractedTexts: string[] = [];
  message = '';
  error = '';
  uploading = false;

  constructor(private pdfExtractor: PDFExtractorService) {}

  // Cuenta cuántos archivos han sido seleccionados
  get selectedFilesCount(): number {
    return this.files.filter(f => f !== null).length;
  }

  // Verifica si se puede procesar (mínimo 3 archivos)
  get canProcess(): boolean {
    return this.selectedFilesCount >= 3;
  }

  onFileSelect(e: any, i: number) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      this.error = 'Solo se permiten archivos PDF';
      setTimeout(() => this.error = '', 3000);
      return;
    }
    
    console.log(`📎 Archivo seleccionado [${i}]:`, file.name, file.size, 'bytes');
    
    this.files[i] = file;
    this.fileNames[i] = file.name;
    this.extractedTexts[i] = '';
    this.error = '';
  }

  removeFile(i: number) {
    this.files[i] = null;
    this.fileNames[i] = '';
    this.extractedTexts[i] = '';
  }

  async uploadAll() {
    if (!this.studentId) {
      this.error = 'Primero selecciona un alumno';
      return;
    }
    
    if (!this.canProcess) {
      this.error = 'Debes subir al menos 3 PDFs para continuar';
      return;
    }

    this.uploading = true;
    this.error = '';
    
    // Filtrar solo los archivos seleccionados
    const selectedFiles = this.files.filter(f => f !== null) as File[];
    const totalFiles = selectedFiles.length;
    
    this.message = `🔄 Extrayendo texto de ${totalFiles} PDF(s)...`;

    try {
      const extractedContents: string[] = [];
      
      // Extraer texto solo de los PDFs seleccionados
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i]) {
          const currentIndex = extractedContents.length + 1;
          this.message = `📖 Procesando PDF ${currentIndex} de ${totalFiles}...`;
          
          try {
            const text = await this.pdfExtractor.extractTextFromPDF(this.files[i]!);
            extractedContents.push(text);
            this.extractedTexts[i] = text;
            console.log(`✅ PDF ${i + 1} procesado:`, text.substring(0, 100) + '...');
          } catch (pdfError: any) {
            throw new Error(`PDF ${i + 1} (${this.fileNames[i]}): ${pdfError.message}`);
          }
          
          // Pausa visual
          await new Promise(r => setTimeout(r, 300));
        }
      }

      this.message = `✅ ¡${totalFiles} PDF(s) procesados exitosamente!`;
      
      // Emitir los textos extraídos
      this.uploadedChange.emit({
        ready: true,
        contents: extractedContents,
        totalFiles: totalFiles
      });

    } catch (err: any) {
      this.error = err.message;
      console.error('❌ Error procesando PDFs:', err);
    } finally {
      this.uploading = false;
    }
  }
}
