import { useMemo, useState } from 'react';

import { enviarMensagemGemini } from '../services/iaService';
import type { MensagemIA } from '../types';

function criarMensagem(
  autor: MensagemIA['autor'],
  texto: string,
): MensagemIA {
  return {
    id: `${autor}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    conversaId: 'sessao-local',
    autor,
    texto,
    criadoEm: new Date().toISOString(),
  };
}

export function useChat() {
  const [mensagens, setMensagens] = useState<MensagemIA[]>([
    criarMensagem(
      'ia',
      'Olá! Eu sou a Ajuda IA do FisicAI. Envie uma dúvida de Física para começarmos.',
    ),
  ]);
  const [textoAtual, setTextoAtual] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  const podeEnviar = useMemo(
    () => textoAtual.trim().length > 0 && !enviando,
    [textoAtual, enviando],
  );

  async function enviarMensagem(): Promise<void> {
    const texto = textoAtual.trim();

    if (!texto || enviando) {
      return;
    }

    const mensagemUsuario = criarMensagem('usuario', texto);
    const historicoComUsuario = [...mensagens, mensagemUsuario];

    setMensagens(historicoComUsuario);
    setTextoAtual('');
    setEnviando(true);

    const resposta = await enviarMensagemGemini(historicoComUsuario);
    const mensagemIA = criarMensagem('ia', resposta);

    setMensagens([...historicoComUsuario, mensagemIA]);
    setEnviando(false);
  }

  return {
    mensagens,
    textoAtual,
    enviando,
    podeEnviar,
    setTextoAtual,
    enviarMensagem,
  };
}
