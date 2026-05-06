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
    suggestedVerdict?: string;
}

interface ComplaintContext {
    description: string;
    type?: string;
    sector?: string;
    accusedPosition?: string;
    actions?: {
        actionType: string;
        authorName: string;
        description: string;
        createdAt: Date | string;
    }[];
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

### NR-12 – Segurança no Trabalho em Máquinas e Equipamentos
- Item 12.1.1: Esta Norma Regulamentadora define referências técnicas e medidas de proteção para garantir a saúde e a integridade física dos trabalhadores.
- Item 12.1.3: O empregador deve adotar medidas de proteção para o trabalho em máquinas e equipamentos, visando à prevenção de acidentes e doenças do trabalho.
- Item 12.1.8: É proibida a fabricação, importação, venda ou locação de máquinas e equipamentos que não atendam ao disposto nesta Norma.

### Política de Sustentabilidade e Meio Ambiente Tecnova
- Diretriz 1: Compromisso com a redução de resíduos industriais e descarte correto de materiais químicos.
- Diretriz 2: Tolerância zero para negligência operacional que resulte em contaminação ambiental.
- Diretriz 3: Uso obrigatório de EPIs específicos para cada área de produção.

### LGPD – Lei 13.709/18 (proteção de dados dos envolvidos)
- Art. 5°, I e II: Dados pessoais (nome, CPF, contato) e dados sensíveis (origem racial, saúde, vida sexual) têm proteção especial.
- Art. 7°, II e IX: O tratamento é permitido quando necessário para o cumprimento de obrigação legal ou para atender aos legítimos interesses do controlador.
- Art. 46: O controlador e o operador devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados.
`;

export async function analyzeComplaintData(context: ComplaintContext | string): Promise<ComplaintInsights | null> {
    // Support both old string-only calls and new context object calls
    const ctx: ComplaintContext = typeof context === 'string'
        ? { description: context }
        : context;

    if (!ai) {
        console.warn('⚠️ GEMINI_API_KEY is not set. Using Demo Mode (Simulated AI).');
        
        // Simulação de análise para demonstração
        const isAssedio = ctx.description.toLowerCase().includes('assédio') || ctx.description.toLowerCase().includes('gritou') || ctx.description.toLowerCase().includes('humilh');
        const isCorrupcao = ctx.description.toLowerCase().includes('dinheiro') || ctx.description.toLowerCase().includes('desvio') || ctx.description.toLowerCase().includes('roubo');
        
        const mockActions = [
            "Convocar denunciante para entrevista confidencial",
            "Coletar evidências documentais citadas no relato",
            "Verificar logs de acesso ao sistema no período mencionado",
            "Consultar o departamento jurídico sobre o enquadramento",
            "Manter monitoramento discreto do setor envolvido"
        ];

        // Se houver histórico de ações, a IA "reage" removendo as já feitas ou sugerindo as próximas
        const nextActions = ctx.actions && ctx.actions.length > 0 
            ? mockActions.slice(ctx.actions.length % 5) 
            : mockActions;

        return {
            sentiment: isAssedio ? "Indignado / Vulnerável" : "Preocupado",
            urgency: isAssedio ? "Alta" : "Normal",
            riskLevel: isAssedio ? "Alto" : "Moderado",
            summary: `A denúncia indica possível ocorrência de ${isAssedio ? 'assédio' : isCorrupcao ? 'corrupção' : 'irregularidade'} no setor ${ctx.sector || 'não identificado'}. O relato apresenta detalhes que sugerem ${isAssedio ? 'comportamento inadequado de superior' : 'desvio de conduta'}.`,
            keyEntities: JSON.stringify([ctx.sector || "Setor Geral", ctx.accusedName || "Pessoa Citada"]),
            recommendedActions: JSON.stringify(nextActions.length > 0 ? nextActions : ["Revisar provas coletadas", "Concluir relatório final"]),
            legalFramework: JSON.stringify([
                "CLT Art. 482 – Mau procedimento", 
                isAssedio ? "CLT Art. 483 – Rescisão Indireta" : "Lei 12.846/13 – Lei Anticorrupção",
                "Normas Internas de Conduta Tecnova"
            ]),
        };
    }

    const typeLabel: Record<string, string> = {
        assedio_sexual: 'Assédio Sexual',
        assedio_moral: 'Assédio Moral',
        corrupcao: 'Corrupção / Desvio de Recursos',
        seguranca_trabalho: 'Risco à Segurança do Trabalho',
        outros: 'Outros',
    };

    const prompt = `
Você é a "AuditorIA v2.0", o motor de inteligência do canal de denúncias da Tecnova. Seu papel evoluiu: você não é apenas uma triadora, mas uma **orientadora de desfecho**.

        Sua missão é ajudar o Comitê de Ética a investigar com rigor e **concluir o caso o mais rápido possível**, respeitando a segurança jurídica e as NRs.

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

        ${ctx.actions && ctx.actions.length > 0 ? `
        ---

        HISTÓRICO DE AÇÕES JÁ TOMADAS PELO COMITÊ (Contexto de Investigação):
        ${ctx.actions.map((a, i) => {
                const typeLabel: Record<string, string> = {
                    entrevista: 'Entrevista', documento: 'Documento coletado',
                    cautelar: 'Medida cautelar', notificacao: 'Notificação enviada',
                    reuniao: 'Reunião do comitê', juridico: 'Consulta jurídica', ia_sugestao: 'Ação sugerida pela IA executada', outro: 'Outro',
                };
                const date = new Date(a.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                return `${i + 1}. [${date}] ${typeLabel[a.actionType] || a.actionType} por ${a.authorName}: ${a.description}`;
            }).join('\n')}

        INSTRUÇÃO DE PROGRESSO: Analise cuidadosamente as ações acima. 
        1. Se uma ação sugerida anteriormente já foi realizada, REMOVA-A das próximas recomendações.
        2. Se as ações no diário já fornecem evidências suficientes, sua prioridade é sugerir o FECHAMENTO do caso.
        ` : ''}

        ---

        TAREFA: Realize a análise técnica. Use o relato, o diário de ações e a BASE LEGAL.

        Responda ESTRITAMENTE em formato JSON com as seguintes chaves:

        1. "sentiment": String — sentimento predominante.
        2. "urgency": String — Opções: "Baixa", "Normal", "Alta", "Crítica". Reavalie para baixo se as ações já tomadas mitigaram o risco imediato.
        3. "riskLevel": String — Opções: "Baixo", "Moderado", "Alto", "Crítico".
        4. "summary": String — Resumo executivo atualizado. Se houver ações no diário, mencione o progresso da apuração.
        5. "keyEntities": Array de strings.
        6. "recommendedActions": Array de strings — Próximos passos cruciais que AINDA NÃO foram feitos. Se o caso estiver pronto para fechar, deixe este array vazio.
        7. "legalFramework": Array de strings — Artigos aplicáveis.
        8. "suggestedVerdict": String — Se a investigação parecer completa, sugira o veredito final (ex: "Procedente com demissão", "Improcedente por falta de provas", "Arquivamento"). Se ainda faltar algo, deixe vazio ou diga "Investigação em curso".
        
`;

    for (let attempt = 1; attempt <= 3; attempt++) {
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
            if (!jsonText) throw new Error("Empty response from Gemini API");

            const parsed = JSON.parse(jsonText);

            return {
                sentiment: parsed.sentiment || "Não detectado",
                urgency: parsed.urgency || "Normal",
                riskLevel: parsed.riskLevel || "Moderado",
                summary: parsed.summary || "Resumo não disponível.",
                keyEntities: JSON.stringify(parsed.keyEntities || []),
                recommendedActions: JSON.stringify(parsed.recommendedActions || []),
                legalFramework: JSON.stringify(parsed.legalFramework || []),
                suggestedVerdict: parsed.suggestedVerdict || "",
            };

        } catch (error) {
            console.error(`❌ AuditorIA v2 attempt ${attempt} failed:`, error instanceof Error ? error.message : error);
            if (attempt === 3) {
                throw new Error("Falha intermitente na comunicação com o servidor Gemini.");
            }
            // Wait 2 seconds before retrying
            await new Promise(res => setTimeout(res, 2000));
        }
    }
    
    return null;
}
