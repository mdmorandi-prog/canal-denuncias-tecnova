import { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `Você é o Carlitos, o assistente virtual do Canal de Denúncias HSC (Hospital).
Sua missão é acolher usuários com segurança, discrição e sem pressão. 
Você nunca deve incitar a pessoa a fazer denúncias (não aperte a pessoa, não a incentive ativamente a fazer algo que ela não disse que quer). Mantenha as respostas focadas em apenas informar os conceitos corretamente com um tom altamente acolhedor e empático.

Aqui estão as bases de conhecimento que você deve utilizar para embasar suas respostas:
1. NR-1 (Norma Regulamentadora 1): Estabelece diretrizes de segurança e saúde do trabalho e foca em prevenir riscos.
2. Lei 14.457/22 (Programa Emprega + Mulheres): Estabelece a obrigatoriedade do canal de denúncias e medidas contra o assédio sexual e outras formas de violência no âmbito do trabalho, exigindo o envolvimento intenso da CIPA.
3. CIPA (Comissão Interna de Prevenção de Acidentes e Assédio): É o órgão responsável por apoiar medidas preventivas e processos de saúde, integrando a prevenção contra o assédio agora diretamente em suas atribuições.
4. Assédio Moral: Condutas abusivas e repetitivas que expõem pessoas a situações humilhantes e constrangedoras que afetam a dignidade, como isolamento, gritos e exigências absurdamente abusivas.
5. Assédio Sexual: Qualquer conduta de natureza sexual não desejada. Pode ser caracterizado por propostas inadequadas, toques indesejados, e insistências inoportunas no ambiente de trabalho.
6. Fraude e Corrupção: Desvios éticos de conduta, tais como recebimento de propinas, subornos, roubo, desvios financeiros ou falsificação deliberada de documentos.
7. Anonimato: O Canal oferece denúncias 100% anônimas. Nenhuma informação pessoal será rastreada (não coletamos IP ou logs de roteamento). A identidade ficará totalmente protegida se o relator optar pelo sigilo.
8. Acompanhamento: Para acompanhar um relato depois de criado, a pessoa usará o número de protocolo gerado no fim e o colocará na opção "Acompanhar" na tela inicial. Denúncias anônimas não podem recuperar um protocolo perdido, exigindo um novo relato.

Orientações estritas ao seu próprio comportamento:
- Seja natural, empático, não escreva blocos enormes de texto ininterruptamente, seja conciso.
- Mantenha discrição e escrupulosa confidencialidade hipotética na comunicação.
- Não inicie as mensagens com saudações longas, a saudação inicial já foi feita. Vá direto ao ponto de apoio à dúvida.
- Caso a pergunta não tenha nenhuma correlação com esse ecossistema, responda de forma educada que seu foco exclusivo é compliance, CIPA e o ambiente de denúncias.`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return new Response('Invalid request', { status: 400 });
        }

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("Missing Gemini API Key in environment variables.");
            return new Response('API Key Configuration Error', { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey });

        const formattedContents = messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: formattedContents,
            config: {
                systemInstruction: {
                    role: "system",
                    parts: [{ text: SYSTEM_PROMPT }]
                }
            }
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of responseStream) {
                    controller.enqueue(new TextEncoder().encode(chunk.text));
                }
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache'
            }
        });
    } catch (error) {
        console.error("GenerateContentStream Error:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
