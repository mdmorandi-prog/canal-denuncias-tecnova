import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK if an API key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface ComplaintInsights {
    sentiment: string;
    urgency: string;
    riskLevel: string;
    summary: string;
    keyEntities: string;        // JSON string array
    recommendedActions: string; // JSON string array
    legalFramework: string;     // JSON string array
}

interface ComplaintContext {
    description: string;
    type?: string;
    sector?: string;
    accusedPosition?: string;
}

// ============================================================
// STATIC LEGAL KNOWLEDGE BASE (Anti-Hallucination Ground Truth)
// Used as in-context reference to prevent the model from
// inventing articles or misquoting Brazilian labor law.
// ============================================================
const LEGAL_KNOWLEDGE_BASE = `
## BASE LEGAL DE REFERÊNCIA
INSTRUÇÃO CRÍTICA: Ao preencher o campo "legalFramework", cite SOMENTE as leis e artigos listados nesta base. NÃO invente leis, artigos ou resoluções que não estejam aqui.

### Lei 14.457/22 – Programa Emprega + Mulheres / Prevenção ao Assédio
- Art. 2°: Empresas com CIPA são obrigadas a implementar código de conduta e canal de denúncias para recebimento e acompanhamento de casos de assédio.
- Art. 3°: O canal de denúncias deve garantir anonimato ao denunciante e ser de fácil acesso a todos os empregados.
- Art. 4°: A CIPA deve promover, anualmente, ações de capacitação para prevenção e combate ao assédio sexual e outras formas de violência.
- Art. 5°: O descumprimento das medidas gera responsabilidade solidária da empresa e dos gestores diretamente envolvidos.

### NR-1 – Gestão de Riscos Ocupacionais (atualizada pela Portaria MTE 1.419/2024)
- Item 1.1.2: O empregador deve elaborar e implementar medidas de prevenção para eliminar ou controlar os riscos ocupacionais.
- Item 1.4.1: O empregador deve gerir os riscos ocupacionais presentes ou que possam surgir no ambiente de trabalho.
- Item 1.4.3: Deve-se priorizar a eliminação dos perigos e, onde não for possível, adotar medidas de proteção coletiva e individual.
- Item 1.5.1: O trabalhador tem o direito de interromper suas atividades quando considerar que elas implicam risco grave e iminente à sua segurança ou saúde.
- PGR – Programa de Gerenciamento de Riscos: Obrigatório para todos os empregadores e deve contemplar riscos psicossociais como assédio e violência.

### CLT – Consolidação das Leis do Trabalho
- Art. 482 (Justa Causa – empregado): São causas de demissão por justa causa: improbidade, incontinência de conduta ou mau procedimento, negociação habitual sem permissão, condenação criminal transitada em julgado, desídia, embriaguez habitual, violação de segredo da empresa, ato de indisciplina ou insubordinação, abandono de emprego, ato lesivo à honra ou boa fama, jogos de azar.
- Art. 483 (Rescisão Indireta – direito do empregado): O empregado pode rescindir o contrato se o empregador exigir serviços superiores às forças, praticar ato lesivo à honra, ofender fisicamente o empregado, ou reduzir o trabalho para diminuir o salário.
- Art. 373-A: É proibido publicar anúncio que inclua sexo, idade, cor ou raça como critério de seleção; praticar assédio sexual; e realizar revista íntima em funcionárias.
- Art. 216-A (Assédio Sexual): Constranger alguém com o intuito de obter vantagem ou favorecimento sexual, prevalecendo-se o agente da sua condição de superior hierárquico ou ascendência inerentes ao exercício de emprego, cargo ou função. Pena: detenção de 1 a 2 anos.

### Lei 9.029/95 – Proibição de Práticas Discriminatórias
- Art. 1°: Fica proibida a adoção de qualquer prática discriminatória e limitativa para efeito de acesso ou manutenção de relação de emprego, por motivo de sexo, origem, raça, cor, estado civil, situação familiar ou idade.
- Art. 4°: O trabalhador poderá optar entre a readmissão com ressarcimento integral de todo o período de afastamento ou a percepção, em dobro, da remuneração do período de afastamento.

### Resolução CFM 2.217/2018 – Código de Ética Médica (contexto hospitalar)
- Art. 1°: É vedado ao médico causar dano ao paciente, por ação ou omissão, caracterizável como imperícia, imprudência ou negligência.
- Art. 32: É vedado ao médico ser conivente com prática contrária ao Código de Ética Médica ou às demais normas que regem o exercício da medicina.
- Art. 57: É vedado ao médico abandonar paciente sob seus cuidados.
- Art. 65: É vedado ao médico desrespeitar o direito do paciente ou de seu representante legal de decidir livremente sobre a execução de práticas diagnósticas ou terapêuticas, salvo em caso de iminente risco de morte.

### LGPD – Lei 13.709/18 (proteção de dados dos envolvidos)
- Art. 5°, I e II: Dados pessoais (nome, CPF, contato) e dados sensíveis (origem racial, saúde, vida sexual) têm proteção especial.
- Art. 7°, II e IX: O tratamento é permitido quando necessário para o cumprimento de obrigação legal ou para atender aos legítimos interesses do controlador.
- Art. 46: O controlador e o operador devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados.
`;

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
Você é a "Nexus IA v2.0", um sistema especializado em compliance hospitalar, ética médica e direito trabalhista brasileiro.
Sua função é apoiar o Comitê de Ética na triagem, priorização e instrução de denúncias recebidas no canal interno.

${LEGAL_KNOWLEDGE_BASE}

---

CASO EM ANÁLISE:
- Tipo de ocorrência: ${typeLabel[ctx.type || ''] || ctx.type || 'Não especificado'}
- Setor envolvido: ${ctx.sector || 'Não especificado'}
- Cargo do acusado: ${ctx.accusedPosition || 'Não especificado'}

RELATO DA DENÚNCIA (verbatim, confidental):
"""
${ctx.description}
"""

---

TAREFA: Realize a análise estruturada abaixo. Use somente as informações do relato e da BASE LEGAL acima.

Responda ESTRITAMENTE em formato JSON com as seguintes chaves:

1. "sentiment": String — sentimento predominante do relator. Ex: "Apavorado", "Revoltado", "Neutro", "Ameaçado", "Desesperançoso", "Técnico/Objetivo".

2. "urgency": String — urgência de intervenção do comitê. Opções estritas: "Baixa", "Normal", "Alta", "Crítica".
   - "Crítica" = crime em andamento, risco de vida, assédio continuado com evidências, denunciante ameaçado.
   - "Alta" = assédio confirmado, irregularidade grave, risco ao paciente.

3. "riskLevel": String — exposição legal e reputacional da instituição. Opções estritas: "Baixo", "Moderado", "Alto", "Crítico".
   - Considere probabilidade de processo trabalhista, sanção do CFM, exposição pública, multas da NR-1.

4. "summary": String — resumo executivo em 3-4 frases. Objetivo, factual, adequado para documentos internos de compliance.

5. "keyEntities": Array de strings — pessoas citadas, setores/unidades, infrações específicas. Sem repetições.
   Ex: ["Dr. João Silva", "UTI Adulto", "Abandono de Paciente", "Assédio Moral Continuado"].

6. "recommendedActions": Array de até 5 strings — ações específicas e priorizadas para o Comitê de Ética.
   Ex: [
     "Convocar depoimento da vítima em até 48h, garantindo sigilo",
     "Notificar RH para não alertar o acusado durante a apuração",
     "Solicitar imagens de câmera do setor entre [datas mencionadas]",
     "Verificar histórico disciplinar do acusado no sistema de RH",
     "Consultar jurídico sobre abertura de sindicância formal"
   ]

7. "legalFramework": Array de strings — cite SOMENTE artigos da BASE LEGAL que se aplicam a este caso.
   Formato obrigatório: "NomeDaLei ArtX – Descrição breve do que se aplica".
   Ex: ["Lei 14.457/22 Art. 2° – Obrigação de investigar via canal de denúncias", "CLT Art. 482 – Possível justa causa por ato lesivo"].
   NÃO invente leis, artigos ou resoluções fora da BASE LEGAL acima.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.1, // Very low for consistent, grounded responses
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
