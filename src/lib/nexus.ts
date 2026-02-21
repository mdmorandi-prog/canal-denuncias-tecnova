import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK if an API key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface ComplaintInsights {
    sentiment: string;
    urgency: string;
    summary: string;
    keyEntities: string; // JSON string array of affected people/departments
}

export async function analyzeComplaintData(description: string): Promise<ComplaintInsights | null> {
    if (!ai) {
        console.warn('⚠️ GEMINI_API_KEY is not set. Nexus IA Analysis skipped.');
        return null; // Gracefully fail if no API key is set
    }

    const prompt = `
    Você é a "Nexus IA", um assistente de inteligência artificial focado em compliance hospitalar e comitê de ética.
    Analise a seguinte denúncia recebida no Canal de Ética do Hospital:
    
    TEXTO DA DENÚNCIA:
    """
    ${description}
    """
    
    Sua tarefa é extrair "Insights" rápidos para que o comitê possa priorizar o caso. 
    Responda ESTRITAMENTE em formato JSON, com as seguintes chaves e valores:
    
    1. "sentiment": String representando o sentimento predominante (Ex: "Revoltado", "Neutro", "Apavorado", "Ameaçador", "Triste", "Denúncia Fria").
    2. "urgency": String representando a urgência/gravidade (Opções estritas: "Baixa", "Normal", "Alta", "Crítica"). Crimes, assédio grave ou risco à vida de pacientes = Crítica.
    3. "summary": String resumindo o fato principal ocorrido em no máximo 2 frases.
    4. "keyEntities": Um Array de Strings contendo nomes de pessoas denunciadas, setores mencionados ou infrações claras, sem repetições. (Ex: ["Urgência e Emergência", "João da Silva", "Desvio de Equipamento"]).
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.1, // Low temperature for consistent classification
            }
        });

        const jsonText = response.text;

        if (!jsonText) return null;

        const parsed = JSON.parse(jsonText);

        return {
            sentiment: parsed.sentiment || "Não detectado",
            urgency: parsed.urgency || "Normal",
            summary: parsed.summary || "Resumo não disponível.",
            keyEntities: JSON.stringify(parsed.keyEntities || []),
        };

    } catch (error) {
        console.error('❌ Failed to analyze complaint with Nexus IA:', error);
        return null;
    }
}
