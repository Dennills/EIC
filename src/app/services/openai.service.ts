import { Injectable } from '@angular/core';
import OpenAI from 'openai';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        // 
        const apiKey = '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';
        
        if (!apiKey || apiKey === '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') {
            console.error('❌ API Key de OpenAI no configurada correctamente');
        }

        this.openai = new OpenAI({
            apiKey: apiKey, 
            dangerouslyAllowBrowser: true
        });
    }

    /**
     * Analiza una rúbrica con formularios marcados con X (escala 1-5)
     * Devuelve nota del 1-20
     */
    async analyzeRubric(content: string, rubricNumber: number): Promise<any> {
        try {
            console.log(`🔍 Analizando Rúbrica ${rubricNumber}...`);
            
            // Validar que el contenido no esté vacío
            if (!content || content.trim().length === 0) {
                throw new Error('El contenido de la rúbrica está vacío');
            }

            // Limitar el contenido si es muy largo (max ~6000 caracteres)
            const maxLength = 6000;
            const truncatedContent = content.length > maxLength 
                ? content.substring(0, maxLength) + '\n\n[...contenido truncado por límite de tokens...]'
                : content;

            console.log(`📄 Longitud del contenido: ${content.length} caracteres`);

            const prompt = `
Eres un evaluador experto de prácticas preprofesionales. Analiza la siguiente RÚBRICA ${rubricNumber}.

ESCALA DE EVALUACIÓN (1-5):
- 1 = Muy deficiente
- 2 = Deficiente  
- 3 = Regular/Aceptable
- 4 = Bueno
- 5 = Excelente

CONTENIDO DE LA RÚBRICA ${rubricNumber}:
${truncatedContent}

TAREAS:
1. Identifica los criterios de evaluación
2. Detecta el nivel marcado (1-5) en cada criterio (busca X o marcas)
3. Calcula el promedio de los niveles
4. Convierte a nota del 1-20: (promedio * 4)
5. Proporciona observaciones detalladas
6. Da 3-5 recomendaciones específicas

Responde SOLO en formato JSON válido:
{
  "rubricNumber": ${rubricNumber},
  "score": 16,
  "criteriaEvaluated": [
    {"name": "Criterio 1", "level": 4}
  ],
  "observations": "Análisis detallado...",
  "recommendations": [
    "Recomendación 1",
    "Recomendación 2"
  ]
}`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un evaluador académico experto. Respondes SOLO en formato JSON válido sin markdown.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 1500,
                response_format: { type: "json_object" }
            });

            const rawContent = response.choices[0].message.content;
            
            // Validar que hay contenido
            if (!rawContent || rawContent.trim().length === 0) {
                throw new Error('La API devolvió una respuesta vacía');
            }

            console.log(`📝 Respuesta raw (primeros 200 chars):`, rawContent.substring(0, 200));
            
            // Limpiar markdown
            let result = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
            // Intentar parsear
            let parsed;
            try {
                parsed = JSON.parse(result);
            } catch (parseError) {
                console.error('❌ Error parseando JSON:', result);
                throw new Error('Respuesta JSON inválida de la API');
            }
            
            // Validar estructura
            if (!parsed.score || !parsed.observations || !parsed.recommendations) {
                console.error('⚠️ Respuesta incompleta:', parsed);
                throw new Error('Respuesta incompleta de la API');
            }

            // Asegurar que score está entre 1-20
            parsed.score = Math.max(1, Math.min(20, parsed.score));

            console.log(`✅ Rúbrica ${rubricNumber} analizada: ${parsed.score}/20`);
            return parsed;

        } catch (error: any) {
            console.error(`❌ Error analizando Rúbrica ${rubricNumber}:`, error);
            
            // Mensajes de error más específicos
            if (error.message?.includes('API key')) {
                throw new Error('API Key inválida o revocada. Por favor configura una API key válida.');
            }
            
            if (error.status === 429) {
                throw new Error('Límite de tasa excedido. Espera un momento e intenta de nuevo.');
            }

            if (error.status === 401) {
                throw new Error('API Key inválida. Verifica tu configuración en openai.service.ts');
            }
            
            throw new Error(`Error al analizar Rúbrica ${rubricNumber}: ${error.message}`);
        }
    }

    /**
     * Genera reporte final consolidado de todas las rúbricas analizadas
     */
    async generateFinalReport(analyses: any[]): Promise<any> {
        try {
            console.log('📊 Generando reporte final de', analyses.length, 'rúbricas...');

            if (!analyses || analyses.length === 0) {
                throw new Error('No hay análisis para procesar');
            }

            const totalScore = analyses.reduce((sum, a) => sum + (a.score || 0), 0);
            const avgScore = (totalScore / analyses.length).toFixed(2);

            // Crear resumen compacto de los análisis
            const analysisSummary = analyses.map(a => ({
                rubric: a.rubricNumber,
                score: a.score,
                mainObservation: a.observations?.substring(0, 100) || ''
            }));

            const prompt = `
Genera un reporte consolidado de ${analyses.length} rúbricas evaluadas.

NOTA PROMEDIO: ${avgScore}/20

ANÁLISIS:
${JSON.stringify(analysisSummary, null, 2)}

Responde SOLO en formato JSON válido:
{
  "finalScore": ${avgScore},
  "executiveSummary": "Síntesis del desempeño general (150-200 palabras)",
  "strengths": ["Fortaleza 1", "Fortaleza 2"],
  "areasForImprovement": ["Área 1", "Área 2"],
  "finalRecommendations": ["Recomendación 1", "Recomendación 2"]
}`;

            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un evaluador académico experto. Respondes SOLO en formato JSON válido sin markdown.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.5,
                max_tokens: 2000,
                response_format: { type: "json_object" }
            });

            const rawContent = response.choices[0].message.content;
            
            if (!rawContent || rawContent.trim().length === 0) {
                throw new Error('La API devolvió una respuesta vacía');
            }

            let result = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const parsed = JSON.parse(result);

            if (!parsed.finalScore || !parsed.executiveSummary) {
                throw new Error('Reporte final incompleto');
            }

            console.log(`✅ Reporte final generado: Nota ${parsed.finalScore}/20`);
            return parsed;

        } catch (error: any) {
            console.error('❌ Error generando reporte final:', error);
            throw new Error(`Error al generar reporte final: ${error.message}`);
        }
    }
}