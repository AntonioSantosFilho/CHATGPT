import { useMemo } from 'react';

import type { NivelDificuldade } from '../types';

export type VariavelFormula = {
  simbolo: string;
  significado: string;
};

export type ExercicioResolvidoSchema = {
  enunciado: string;
  passo_a_passo: string;
  resolucao_legivel: string;
  resolucao_latex: string;
  resposta_final: string;
};

export type ConteudoTeoricoSchema = {
  tema: string;
  topico: string;
  conceito: string;
  formula_legivel: string;
  formula_latex: string;
  variaveis: VariavelFormula[];
  nota_pedagogica: string;
  exercicio_resolvido: ExercicioResolvidoSchema;
  fonte_externa_necessaria: boolean;
  fonte: string;
  dificuldade?: NivelDificuldade;
};

type ConteudosJson = {
  conteudos?: ConteudoTeoricoSchema[];
};

const conteudosJson = require('../data/teoria.json') as
  | ConteudosJson
  | ConteudoTeoricoSchema[];

const dificuldadeFallbackPorIndice: NivelDificuldade[] = [
  'facil',
  'medio',
  'dificil',
];

function normalizarConteudos(): ConteudoTeoricoSchema[] {
  const lista = Array.isArray(conteudosJson)
    ? conteudosJson
    : conteudosJson.conteudos ?? [];

  return lista.map((conteudo, index) => ({
    ...conteudo,
    dificuldade:
      conteudo.dificuldade ??
      dificuldadeFallbackPorIndice[index % dificuldadeFallbackPorIndice.length],
  }));
}

export function useConteudoTeorico(dificuldade?: NivelDificuldade) {
  return useMemo(() => {
    const conteudos = normalizarConteudos();

    const conteudosFiltrados = dificuldade
      ? conteudos.filter((conteudo) => conteudo.dificuldade === dificuldade)
      : conteudos;

    const agrupadosPorDificuldade = conteudos.reduce<
      Record<NivelDificuldade, ConteudoTeoricoSchema[]>
    >(
      (acc, conteudo) => {
        const nivel = conteudo.dificuldade ?? 'facil';
        acc[nivel].push(conteudo);
        return acc;
      },
      {
        facil: [],
        medio: [],
        dificil: [],
      },
    );

    return {
      conteudos,
      conteudosFiltrados,
      agrupadosPorDificuldade,
    };
  }, [dificuldade]);
}

export function buscarConteudoPorTopico(
  topico: string,
): ConteudoTeoricoSchema | undefined {
  return normalizarConteudos().find((conteudo) => conteudo.topico === topico);
}
