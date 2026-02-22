import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK if an API key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface ComplaintInsights {
    sentiment: string;
    urgency: string;
    riskLevel: string;
    summary: string;
    keyEntities: string;       // JSON string array
    recommendedActions: string; // JSON string array
    legalFramework: string;    // JSON string array
}

interface ComplaintContext {
    description: string;
    type?: string;
    sector?: string;
    accusedPosition?: string;
}

export async function analyzeComplaintData(context: ComplaintContext | string): Promise<ComplaintInsights | null> {
    if (!ai) {
        console.warn('⚠️ GEMINI_API_KEY is not set. Nexus IA Analysis skipped.');
        return null;
    }

    // Support both old string-only calls and new context object calls
    const ctx: ComplaintContext = typeof context === 'string'
        ? { description: context }
        : context;

    const typeLabel: Record<string, string> = {
        assedio_sexual: 'Assédio Sexual',
        assedio_moral: 'Assédio Moral',
        corrupcao: 'Corrupção / Desvio de Recursos',
        seguranca_paciente: 'Risco à Segurança do Paciente',
        outros: 'Outros',
    };

    const prompt = `
Você é a "Nexus IA v2", um sistema de inteligência artificial especializado em compliance hospitalar, legislação trabalhista brasileira e ética médica.

Analise a seguinte denúncia recebida no Canal de Ética Hospitalar:

CONTEXTO:
- Tipo de ocorrência: ${typeLabel[ctx.type || ''] || ctx.type || 'Não especificado'}
- Setor envolvido: ${ctx.sector || 'Não especificado'}
- Cargo do acusado: ${ctx.accusedPosition || 'Não especificado'}

RELATO DA DENÚNCIA:
"""
${ctx.description}
"""

Sua tarefa é realizar uma análise estruturada profunda para auxiliar o Comitê de Ética nas próximas etapas. 
Responda ESTRITAMENTE em formato JSON com as seguintes chaves:

1. "sentiment": String do sentimento predominante do relator (Ex: "Revoltado", "Apavorado", "Neutro", "Ameaçado", "Desesperançoso", "Denúncia Técnica").

2. "urgency": Nível de urgência/gravidade temporal (opções estritas: "Baixa", "Normal", "Alta", "Crítica"). Crimes, assédio continuado grave, ou risco de vida = "Crítica".

3. "riskLevel": Nível de exposição legal e reputacional da instituição (opções estritas: "Baixo", "Moderado", "Alto", "Crítico"). Considere: potencial de processo trabalhista, exposição pública, impacto regulatório.

4. "summary": String com um resumo executivo da situação em 3-4 frases. Seja objetivo, factual e use linguagem adequada para documentos internos de compliance.

5. "keyEntities": Array de strings com entidades identificadas: nomes de pessoas citadas, setores/unidades, comportamentos infracionais específicos. Sem repetições. Ex: ["Dr. João Silva", "UTI Adulto", "Assédio Continuado", "Desvio de Medicamentos"].

6. "recommendedActions": Array de strings com as ações recomendadas para o Comitê de Ética, em ordem de prioridade. Máximo 5 ações específicas e acionáveis. Ex: ["Convocar coleta de depoimento da vítima em até 48h", "Notificar a gestão do setor para não alertar o acusado", "Verificar câmeras de segurança do setor indicado no período"].

7. "legalFramework": Array de strings com os embasamentos legais e normativos aplicáveis a este caso. Use os nomes exatos das leis/normas brasileiras. Ex: ["Lei 14.457/22 - CIPA e combate ao assédio", "NR-1 - Gestão de Riscos Ocupacionais", "CLT Art. 482 - Justa Causa", "Resolução CFM 2.217/2018 - Código de Ética Médica", "LGPD - Lei 13.709/18"].
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.15,
            }
        });

        const jsonText = response.text;
        if (!jsonText) return null;

        const parsed = JSON.parse(jsonText);

        return {
            sentiment: parsed.sentiment || "Não detectado",
            urgency: parsed.urgency || "Normal",
            riskLevel: parsed.riskLevel || "Moderado",
            summary: parsed.summary || "Resumo não disponível.",
            keyEntities: JSON.stringify(parsed.keyEntities || []),
            recommendedActions: JSON.stringify(parsed.recommendedActions || []),
            legalFramework: JSON.stringify(parsed.legalFramework || []),
        };

    } catch (error) {
        console.error('❌ Failed to analyze complaint with Nexus IA v2:', error);
        return null;
    }
}
