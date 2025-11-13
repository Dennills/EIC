import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-panel">
      <h3>Subir 3 PDFs</h3>
      <div class="file-row" *ngFor="let f of files; let i = index">
        <label class="file-label">
          📄 Seleccionar archivo {{ i + 1 }}
          <input type="file" accept="application/pdf" (change)="onFileSelect($event, i)" hidden>
        </label>
        <span class="name">{{ fileNames[i] || 'Sin archivo' }}</span>
      </div>

      <div class="btns">
        <button (click)="uploadAll()" class="primary">Subir</button>
      </div>

      <p class="status" *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .upload-panel{background:white;padding:16px;border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,0.05)}
    .file-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
    .file-label{background:#0a3d62;color:white;padding:8px 12px;border-radius:8px;cursor:pointer;display:inline-block}
    .file-label:hover{background:#145a8d}
    .name{font-size:13px;color:#555}
    .btns{margin-top:10px}
    .primary{background:#0a3d62;color:white;padding:8px 14px;border:none;border-radius:8px;cursor:pointer}
    .primary:hover{background:#145a8d}
    .status{margin-top:8px;color:#0b3d91}
  `]
})
export class UploadComponent {
  @Input() studentId!: number | null;
  @Output() uploadedChange = new EventEmitter<boolean>();

  files: (File | null)[] = [null, null, null];
  fileNames = ['', '', ''];
  message = '';

  onFileSelect(e: any, i: number) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') return alert('Solo se permiten PDFs.');
    this.files[i] = file;
    this.fileNames[i] = file.name;
  }

  async uploadAll() {
    if (!this.studentId) return alert('Primero selecciona un alumno.');
    if (this.files.some(f => !f)) return alert('Debes subir los 3 PDFs.');
    this.message = 'Subiendo archivos...';
    await new Promise(r => setTimeout(r, 1000));
    this.message = '✅ Archivos subidos correctamente.';
    this.uploadedChange.emit(true);
  }
}
