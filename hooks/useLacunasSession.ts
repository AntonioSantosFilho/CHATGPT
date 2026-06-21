import { useEffect, useMemo, useState } from 'react';

import { salvarProgressoSessao } from '../services/progressoService';
import type { NivelDificuldade } from '../types';
import {
  compararRespostaDigitada,
  normalizarResposta,
} from '../utils/normalizarResposta';
import type { DificuldadeFiltro } from './useQuizSession';

export type LacunaSchema = {
  id: string;
  modulo_id: string;
  frase: string;
  resposta: string;
  respostas_aceitas: string[];
  explicacao: string;
  dificuldade: NivelDificuldade;
  fonte: string;
};

type LacunasJson = {
  lacunas: LacunaSchema[];
};

const lacunasJson = require('../data/lacunas.json') as LacunasJson;

type UseLacunasSessionParams = {
  moduloId: string;
  dificuldade: DificuldadeFiltro;
};

export function useLacunasSession({
  moduloId,
  dificuldade,
}: UseLacunasSessionParams) {
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostaDigitada, setRespostaDigitada] = useState<string>('');
  const [respostaEnviada, setRespostaEnviada] = useState<string | null>(null);
  const [acertos, setAcertos] = useState<number>(0);
  const [tempoSegundos, setTempoSegundos] = useState<number>(0);
  const [finalizado, setFinalizado] = useState<boolean>(false);
  const [progressoSalvo, setProgressoSalvo] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    visivel: boolean;
    tipo: 'acerto' | 'erro';
    titulo: string;
    explicacao: string;
  }>({
    visivel: false,
    tipo: 'acerto',
    titulo: '',
    explicacao: '',
  });

  const lacunas = useMemo(() => {
    const porModulo = lacunasJson.lacunas.filter(
      (lacuna) => lacuna.modulo_id === moduloId,
    );

    if (dificuldade === 'todas') {
      return porModulo;
    }

    return porModulo.filter((lacuna) => lacuna.dificuldade === dificuldade);
  }, [moduloId, dificuldade]);

  const lacunaAtual = lacunas[indiceAtual];
  const total = lacunas.length;

  useEffect(() => {
    if (finalizado) {
      return;
    }

    const intervalId = setInterval(() => {
      setTempoSegundos((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [finalizado]);

  useEffect(() => {
    if (!finalizado || progressoSalvo || total === 0) {
      return;
    }

    setProgressoSalvo(true);

    void salvarProgressoSessao({
      tipo: 'lacunas',
      modulo: moduloId,
      dificuldade,
      acertos,
      total,
      tempoSegundos,
    });
  }, [
    acertos,
    dificuldade,
    finalizado,
    moduloId,
    progressoSalvo,
    tempoSegundos,
    total,
  ]);

  function validarResposta(): void {
    if (!lacunaAtual || respostaEnviada !== null) {
      return;
    }

    const respostasAceitas = [
      lacunaAtual.resposta,
      ...lacunaAtual.respostas_aceitas,
    ];

    const acertou = compararRespostaDigitada(
      respostaDigitada,
      respostasAceitas,
    );

    setRespostaEnviada(normalizarResposta(respostaDigitada));

    if (acertou) {
      setAcertos((current) => current + 1);
    }

    setFeedback({
      visivel: true,
      tipo: acertou ? 'acerto' : 'erro',
      titulo: acertou ? 'Lacuna correta!' : 'Resposta incorreta',
      explicacao: lacunaAtual.explicacao,
    });
  }

  function avancar(): void {
    const proximoIndice = indiceAtual + 1;

    setFeedback((current) => ({
      ...current,
      visivel: false,
    }));

    setRespostaDigitada('');
    setRespostaEnviada(null);

    if (proximoIndice >= total) {
      setFinalizado(true);
      return;
    }

    setIndiceAtual(proximoIndice);
  }

  function reiniciar(): void {
    setIndiceAtual(0);
    setRespostaDigitada('');
    setRespostaEnviada(null);
    setAcertos(0);
    setTempoSegundos(0);
    setFinalizado(false);
    setProgressoSalvo(false);
    setFeedback({
      visivel: false,
      tipo: 'acerto',
      titulo: '',
      explicacao: '',
    });
  }

  return {
    lacunas,
    lacunaAtual,
    indiceAtual,
    total,
    respostaDigitada,
    respostaEnviada,
    acertos,
    tempoSegundos,
    finalizado,
    feedback,
    setRespostaDigitada,
    validarResposta,
    avancar,
    reiniciar,
  };
}
