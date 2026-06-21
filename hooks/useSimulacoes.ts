import { useMemo } from 'react';

export type TemaSimulacao = 'eletromagnetismo' | 'eletrostatica' | 'circuitos';

export type SimulacaoPhetSchema = {
  id: string;
  nome: string;
  url: string;
  tema: TemaSimulacao;
  descricao: string;
  topicos: string[];
  objetivos: string[];
};

type SimulacoesJson = {
  simulacoes: SimulacaoPhetSchema[];
};

const simulacoesJson = require('../data/phet-simulacoes.json') as SimulacoesJson;

export function useSimulacoes() {
  return useMemo(() => {
    const simulacoes = simulacoesJson.simulacoes;

    const agrupadasPorTema = simulacoes.reduce<
      Record<TemaSimulacao, SimulacaoPhetSchema[]>
    >(
      (acc, simulacao) => {
        acc[simulacao.tema].push(simulacao);
        return acc;
      },
      {
        eletromagnetismo: [],
        eletrostatica: [],
        circuitos: [],
      },
    );

    return {
      simulacoes,
      agrupadasPorTema,
    };
  }, []);
}

export function buscarSimulacaoPorId(
  id: string,
): SimulacaoPhetSchema | undefined {
  return simulacoesJson.simulacoes.find((simulacao) => simulacao.id === id);
}
