import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({ providedIn: 'root' })
export class PDFExtractorService {
    
    constructor() {
        // Configurar el worker de PDF.js correctamente
        const pdfjsVersion = pdfjsLib.version;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
    }

    async extractTextFromPDF(file: File): Promise<string> {
        try {
        console.log('📄 Iniciando extracción de:', file.name);
        
        // Convertir File a ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        console.log('✅ ArrayBuffer obtenido:', arrayBuffer.byteLength, 'bytes');
        
        // Cargar el documento PDF
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true
        });
        
        const pdf = await loadingTask.promise;
        console.log('✅ PDF cargado. Páginas:', pdf.numPages);
        
        let fullText = '';
        
        // Extraer texto de todas las páginas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            console.log(`📖 Procesando página ${pageNum}/${pdf.numPages}...`);
            
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            // Extraer texto de los items
            const pageText = textContent.items
            .map((item: any) => {
                // Verificar que el item tenga la propiedad 'str'
                if (item && typeof item.str === 'string') {
                return item.str;
                }
                return '';
            })
            .filter(text => text.trim() !== '') // Filtrar textos vacíos
            .join(' ');
            
            fullText += pageText + '\n\n';
            console.log(`✅ Página ${pageNum} procesada. Caracteres: ${pageText.length}`);
        }
        
        console.log('✅ Texto total extraído:', fullText.length, 'caracteres');
        
        if (fullText.trim() === '') {
            throw new Error('El PDF no contiene texto extraíble. Puede ser un PDF escaneado o con imágenes.');
        }
        
        return fullText.trim();
        
        } catch (error: any) {
        console.error('❌ Error completo:', error);
        
        // Mensajes de error más específicos
        if (error.message?.includes('Invalid PDF')) {
            throw new Error('El archivo no es un PDF válido');
        }
        if (error.message?.includes('Password')) {
            throw new Error('El PDF está protegido con contraseña');
        }
        if (error.name === 'InvalidPDFException') {
            throw new Error('El PDF está corrupto o dañado');
        }
        
        throw new Error(`Error al leer el PDF: ${error.message || 'Archivo no compatible'}`);
        }
    }

    /**
     * Método alternativo para PDFs escaneados o con imágenes
     * (Requeriría Tesseract.js para OCR - lo dejamos como placeholder)
     */
    async extractTextWithOCR(file: File): Promise<string> {
        throw new Error('OCR no implementado aún. Usa PDFs con texto seleccionable.');
    }
}