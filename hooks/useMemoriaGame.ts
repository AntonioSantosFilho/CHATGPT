import { useEffect, useMemo, useState } from 'react';

import { salvarProgressoSessao } from '../services/progressoService';
import type { NivelDificuldade } from '../types';

export type TipoParMemoria =
  | 'conceito_definicao'
  | 'conceito_formula'
  | 'termo_simbolo'
  | 'fenomeno_aplicacao';

export type TipoConteudoCarta = 'texto' | 'formula';

export type ConteudoCartaMemoria = {
  tipo_conteudo: TipoConteudoCarta;
  conteudo: string;
};

export type ParMemoriaSchema = {
  id: string;
  tipo_par: TipoParMemoria;
  carta_a: ConteudoCartaMemoria;
  carta_b: ConteudoCartaMemoria;
  explicacao_pos_acerto: string;
  dificuldade: NivelDificuldade;
  fonte: string;
};

export type MemoriaModuloSchema = {
  modulo: string;
  pares: ParMemoriaSchema[];
};

export type CartaMemoriaJogo = {
  id: string;
  parId: string;
  lado: 'a' | 'b';
  tipoConteudo: TipoConteudoCarta;
  conteudo: string;
};

type MemoriaModuloJson =
  | MemoriaModuloSchema
  | {
      id?: string;
      titulo?: string;
      pares?: ParMemoriaSchema[];
    };

type MemoriaJson =
  | MemoriaModuloJson
  | MemoriaModuloJson[]
  | {
      modulos?: MemoriaModuloJson[];
    };

const memoriaJson = require('../data/memoria.json') as MemoriaJson;

function temListaDeModulos(
  value: MemoriaJson,
): value is { modulos?: MemoriaModuloJson[] } {
  return !Array.isArray(value) && 'modulos' in value;
}

function obterNomeModulo(modulo: MemoriaModuloJson): string {
  if ('modulo' in modulo && modulo.modulo) {
    return modulo.modulo;
  }

  if ('titulo' in modulo && modulo.titulo) {
    return modulo.titulo;
  }

  if ('id' in modulo && modulo.id) {
    return modulo.id;
  }

  return 'Modulo sem titulo';
}

function normalizarModulos(): MemoriaModuloSchema[] {
  let modulos: MemoriaModuloJson[];

  if (Array.isArray(memoriaJson)) {
    modulos = memoriaJson;
  } else if (temListaDeModulos(memoriaJson)) {
    modulos = Array.isArray(memoriaJson.modulos) ? memoriaJson.modulos : [];
  } else {
    modulos = [memoriaJson];
  }

  return modulos.map((modulo) => ({
    modulo: obterNomeModulo(modulo),
    pares: Array.isArray(modulo.pares) ? modulo.pares : [],
  }));
}

function embaralhar<T>(lista: T[]): T[] {
  return [...lista].sort(() => Math.random() - 0.5);
}

export function listarModulosMemoria(): MemoriaModuloSchema[] {
  return normalizarModulos();
}

export function buscarModuloMemoria(
  modulo: string,
): MemoriaModuloSchema | undefined {
  return normalizarModulos().find((item) => item.modulo === modulo);
}

export function useMemoriaGame(
  modulo: string,
  dificuldade: NivelDificuldade,
) {
  const [cartas, setCartas] = useState<CartaMemoriaJogo[]>([]);
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [encontradas, setEncontradas] = useState<string[]>([]);
  const [cartasErro, setCartasErro] = useState<string[]>([]);
  const [tempoSegundos, setTempoSegundos] = useState<number>(0);
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
  const [progressoSalvo, setProgressoSalvo] = useState<boolean>(false);

  const pares = useMemo(() => {
    const moduloEncontrado = buscarModuloMemoria(modulo);

    return (
      moduloEncontrado?.pares.filter(
        (par) => par.dificuldade === dificuldade,
      ) ?? []
    );
  }, [modulo, dificuldade]);

  const totalPares = pares.length;
  const acertos = encontradas.length;
  const finalizado = totalPares > 0 && acertos === totalPares;

  useEffect(() => {
    const novasCartas = pares.flatMap<CartaMemoriaJogo>((par) => [
      {
        id: `${par.id}-a`,
        parId: par.id,
        lado: 'a',
        tipoConteudo: par.carta_a.tipo_conteudo,
        conteudo: par.carta_a.conteudo,
      },
      {
        id: `${par.id}-b`,
        parId: par.id,
        lado: 'b',
        tipoConteudo: par.carta_b.tipo_conteudo,
        conteudo: par.carta_b.conteudo,
      },
    ]);

    setCartas(embaralhar(novasCartas));
    setSelecionadas([]);
    setEncontradas([]);
    setCartasErro([]);
    setTempoSegundos(0);
    setProgressoSalvo(false);
  }, [pares]);

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
    if (!finalizado || progressoSalvo) {
      return;
    }

    setProgressoSalvo(true);

    void salvarProgressoSessao({
      tipo: 'memoria',
      modulo,
      dificuldade,
      acertos,
      total: totalPares,
      tempoSegundos,
    });
  }, [
    acertos,
    dificuldade,
    finalizado,
    modulo,
    progressoSalvo,
    tempoSegundos,
    totalPares,
  ]);

  function selecionarCarta(cartaId: string): void {
    const carta = cartas.find((item) => item.id === cartaId);

    if (!carta) {
      return;
    }

    if (
      selecionadas.includes(cartaId) ||
      encontradas.includes(carta.parId) ||
      selecionadas.length >= 2 ||
      feedback.visivel
    ) {
      return;
    }

    if (selecionadas.length === 0) {
      setSelecionadas([cartaId]);
      return;
    }

    const primeiraCartaId = selecionadas[0];
    const primeiraCarta = cartas.find((item) => item.id === primeiraCartaId);

    if (!primeiraCarta) {
      setSelecionadas([]);
      return;
    }

    const novaSelecao = [primeiraCartaId, cartaId];
    setSelecionadas(novaSelecao);

    if (primeiraCarta.parId === carta.parId && primeiraCarta.id !== carta.id) {
      const parEncontrado = pares.find((par) => par.id === carta.parId);

      setEncontradas((current) => [...current, carta.parId]);

      setFeedback({
        visivel: true,
        tipo: 'acerto',
        titulo: 'Acertou!',
        explicacao:
          parEncontrado?.explicacao_pos_acerto ??
          'Você associou corretamente o conceito à sua definição.',
      });

      return;
    }

    setCartasErro(novaSelecao);

    setFeedback({
      visivel: true,
      tipo: 'erro',
      titulo: 'Ainda não é esse par',
      explicacao:
        'Observe se as duas cartas pertencem ao mesmo conceito físico. Uma dica é comparar unidade, fórmula, fenômeno ou palavra-chave antes de tentar novamente.',
    });
  }

  function fecharFeedback(): void {
    if (feedback.tipo === 'erro') {
      setCartasErro([]);
    }

    setSelecionadas([]);
    setFeedback((current) => ({
      ...current,
      visivel: false,
    }));
  }

  function reiniciar(): void {
    setCartas(embaralhar(cartas));
    setSelecionadas([]);
    setEncontradas([]);
    setCartasErro([]);
    setTempoSegundos(0);
    setProgressoSalvo(false);
    setFeedback({
      visivel: false,
      tipo: 'acerto',
      titulo: '',
      explicacao: '',
    });
  }

  function cartaEstaRevelada(carta: CartaMemoriaJogo): boolean {
    return selecionadas.includes(carta.id) || encontradas.includes(carta.parId);
  }

  function cartaEstaEncontrada(carta: CartaMemoriaJogo): boolean {
    return encontradas.includes(carta.parId);
  }

  function cartaEstaComErro(carta: CartaMemoriaJogo): boolean {
    return cartasErro.includes(carta.id);
  }

  return {
    cartas,
    pares,
    selecionadas,
    encontradas,
    cartasErro,
    totalPares,
    acertos,
    tempoSegundos,
    feedback,
    finalizado,
    selecionarCarta,
    fecharFeedback,
    reiniciar,
    cartaEstaRevelada,
    cartaEstaEncontrada,
    cartaEstaComErro,
  };
}
