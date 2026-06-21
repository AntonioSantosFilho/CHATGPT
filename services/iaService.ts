import type { MensagemIA } from '../types';

const SYSTEM_PROMPT =
  'Você é um professor de física para alunos do ensino médio. Responda em português, de forma didática e objetiva.';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL =
  process.env.EXPO_PUBLIC_GEMINI_MODEL ?? 'gemini-2.5-flash-lite';

type GeminiRole = 'user' | 'model';

type GeminiContent = {
  role: GeminiRole;
  parts: Array<{
    text: string;
  }>;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function removerMensagensAntesDoPrimeiroUsuario(
  mensagens: MensagemIA[],
): MensagemIA[] {
  const primeiroUsuarioIndex = mensagens.findIndex(
    (mensagem) => mensagem.autor === 'usuario',
  );

  if (primeiroUsuarioIndex < 0) {
    return [];
  }

  return mensagens.slice(primeiroUsuarioIndex);
}

function adaptarHistoricoParaGemini(mensagens: MensagemIA[]): GeminiContent[] {
  return removerMensagensAntesDoPrimeiroUsuario(mensagens)
    .filter((mensagem) => mensagem.autor === 'usuario' || mensagem.autor === 'ia')
    .map((mensagem) => ({
      role: mensagem.autor === 'usuario' ? 'user' : 'model',
      parts: [{ text: mensagem.texto }],
    }));
}

function mensagemPorStatus(status: number): string {
  if (status === 400) {
    return 'Não consegui processar essa pergunta agora. Tente reformular com menos detalhes ou de forma mais direta.';
  }

  if (status === 401 || status === 403) {
    return 'A chave da IA não está válida ou não tem permissão. Verifique a configuração da API antes de tentar novamente.';
  }

  if (status === 429) {
    return 'A IA atingiu o limite de uso no momento. Tente novamente mais tarde.';
  }

  if (status >= 500) {
    return 'O modelo de IA está temporariamente indisponível. Tente novamente em alguns instantes.';
  }

  return 'Não consegui responder agora. Tente novamente em alguns instantes.';
}

export async function enviarMensagemGemini(
  historico: MensagemIA[],
): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'A chave da IA não foi configurada. Defina EXPO_PUBLIC_GEMINI_API_KEY no ambiente do projeto.';
  }

  const contents = adaptarHistoricoParaGemini(historico);

  if (contents.length === 0) {
    return 'Digite uma dúvida de Física para eu ajudar.';
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            topP: 0.9,
            maxOutputTokens: 700,
          },
        }),
      },
    );

    const data = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      return mensagemPorStatus(response.status);
    }

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join('\n')
        .trim() ?? '';

    if (!text) {
      return 'A IA não retornou uma resposta em texto. Tente perguntar de outra forma.';
    }

    return text;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return 'A resposta demorou mais do que o esperado. Verifique sua conexão e tente novamente.';
    }

    return 'Não foi possível conectar à IA agora. Verifique sua internet e tente novamente.';
  } finally {
    clearTimeout(timeoutId);
  }
}
