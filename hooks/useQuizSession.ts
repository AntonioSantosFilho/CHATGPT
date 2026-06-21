import { useEffect, useMemo, useState } from 'react';

import { salvarProgressoSessao } from '../services/progressoService';
import type { NivelDificuldade } from '../types';

export type DificuldadeFiltro = NivelDificuldade | 'todas';

export type TipoQuestaoJogo = 'multipla_escolha' | 'calculo';

export type AlternativaQuestao = {
  letra: string;
  texto: string;
};

export type QuestaoJogoSchema = {
  id: string;
  tipo: TipoQuestaoJogo;
  enunciado: string;
  alternativas: AlternativaQuestao[];
  resposta_correta: string;
  explicacao: string;
  dificuldade: NivelDificuldade;
  fonte: string;
};

export type ModuloQuestoesSchema = {
  id: string;
  titulo: string;
  descricao: string;
  questoes: QuestaoJogoSchema[];
};

type QuestoesJson = {
  modulos: ModuloQuestoesSchema[];
};

const questoesJson = require('../data/questoes.json') as QuestoesJson;

export function listarModulosQuestoes(): ModuloQuestoesSchema[] {
  return questoesJson.modulos;
}

export function buscarModuloQuestoes(
  moduloId: string,
): ModuloQuestoesSchema | undefined {
  return questoesJson.modulos.find((modulo) => modulo.id === moduloId);
}

type UseQuizSessionParams = {
  moduloId: string;
  dificuldade: DificuldadeFiltro;
  tipoSessao: 'quiz' | 'desafio';
};

export function useQuizSession({
  moduloId,
  dificuldade,
  tipoSessao,
}: UseQuizSessionParams) {
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(
    null,
  );
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

  const modulo = useMemo(() => buscarModuloQuestoes(moduloId), [moduloId]);

  const questoes = useMemo(() => {
    const lista = modulo?.questoes ?? [];

    if (dificuldade === 'todas') {
      return lista;
    }

    return lista.filter((questao) => questao.dificuldade === dificuldade);
  }, [modulo, dificuldade]);

  const questaoAtual = questoes[indiceAtual];
  const total = questoes.length;

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
      tipo: tipoSessao,
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
    tipoSessao,
    total,
  ]);

  function responder(letra: string): void {
    if (!questaoAtual || respostaSelecionada) {
      return;
    }

    const acertou = letra === questaoAtual.resposta_correta;

    setRespostaSelecionada(letra);

    if (acertou) {
      setAcertos((current) => current + 1);
    }

    setFeedback({
      visivel: true,
      tipo: acertou ? 'acerto' : 'erro',
      titulo: acertou ? 'Resposta correta!' : 'Resposta incorreta',
      explicacao: questaoAtual.explicacao,
    });
  }

  function avancar(): void {
    const proximoIndice = indiceAtual + 1;

    setFeedback((current) => ({
      ...current,
      visivel: false,
    }));

    setRespostaSelecionada(null);

    if (proximoIndice >= total) {
      setFinalizado(true);
      return;
    }

    setIndiceAtual(proximoIndice);
  }

  function reiniciar(): void {
    setIndiceAtual(0);
    setRespostaSelecionada(null);
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
    modulo,
    questoes,
    questaoAtual,
    indiceAtual,
    total,
    respostaSelecionada,
    acertos,
    tempoSegundos,
    finalizado,
    feedback,
    responder,
    avancar,
    reiniciar,
  };
}
