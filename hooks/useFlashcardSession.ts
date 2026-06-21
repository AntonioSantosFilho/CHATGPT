import { useEffect, useMemo, useState } from 'react';

import { salvarProgressoSessao } from '../services/progressoService';
import type { NivelDificuldade } from '../types';

export type TipoFlashcard = 'conceito' | 'formula' | 'aplicacao';

export type FlashcardSchema = {
  id: string;
  frente: string;
  verso: string;
  tipo: TipoFlashcard;
  dificuldade: NivelDificuldade;
  fonte: string;
};

export type FlashcardModuloSchema = {
  modulo: string;
  flashcards: FlashcardSchema[];
};

type FlashcardModuloJson =
  | FlashcardModuloSchema
  | {
      id?: string;
      titulo?: string;
      flashcards?: FlashcardSchema[];
    };

type FlashcardsJson =
  | FlashcardModuloJson
  | FlashcardModuloJson[]
  | {
      modulos?: FlashcardModuloJson[];
    };

const flashcardsJson = require('../data/flashcards.json') as FlashcardsJson;

function temListaDeModulos(
  value: FlashcardsJson,
): value is { modulos?: FlashcardModuloJson[] } {
  return !Array.isArray(value) && 'modulos' in value;
}

function obterNomeModulo(modulo: FlashcardModuloJson): string {
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

function normalizarModulos(): FlashcardModuloSchema[] {
  let modulos: FlashcardModuloJson[];

  if (Array.isArray(flashcardsJson)) {
    modulos = flashcardsJson;
  } else if (temListaDeModulos(flashcardsJson)) {
    modulos = Array.isArray(flashcardsJson.modulos) ? flashcardsJson.modulos : [];
  } else {
    modulos = [flashcardsJson];
  }

  return modulos.map((modulo) => ({
    modulo: obterNomeModulo(modulo),
    flashcards: Array.isArray(modulo.flashcards) ? modulo.flashcards : [],
  }));
}

export function listarModulosFlashcards(): FlashcardModuloSchema[] {
  return normalizarModulos();
}

export function buscarModuloFlashcards(
  modulo: string,
): FlashcardModuloSchema | undefined {
  return normalizarModulos().find((item) => item.modulo === modulo);
}

export function useFlashcardSession(
  modulo: string,
  dificuldade: NivelDificuldade,
) {
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [virado, setVirado] = useState<boolean>(false);
  const [acertos, setAcertos] = useState<number>(0);
  const [tempoSegundos, setTempoSegundos] = useState<number>(0);
  const [sessaoFinalizada, setSessaoFinalizada] = useState<boolean>(false);
  const [progressoSalvo, setProgressoSalvo] = useState<boolean>(false);

  const flashcards = useMemo(() => {
    const moduloEncontrado = buscarModuloFlashcards(modulo);

    return (
      moduloEncontrado?.flashcards.filter(
        (flashcard) => flashcard.dificuldade === dificuldade,
      ) ?? []
    );
  }, [modulo, dificuldade]);

  const flashcardAtual = flashcards[indiceAtual];
  const total = flashcards.length;

  useEffect(() => {
    if (sessaoFinalizada) {
      return;
    }

    const intervalId = setInterval(() => {
      setTempoSegundos((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [sessaoFinalizada]);

  useEffect(() => {
    if (!sessaoFinalizada || progressoSalvo || total === 0) {
      return;
    }

    setProgressoSalvo(true);

    void salvarProgressoSessao({
      tipo: 'flashcards',
      modulo,
      dificuldade,
      acertos,
      total,
      tempoSegundos,
    });
  }, [
    acertos,
    dificuldade,
    modulo,
    progressoSalvo,
    sessaoFinalizada,
    tempoSegundos,
    total,
  ]);

  function virarCarta(): void {
    setVirado((current) => !current);
  }

  function responder(lembrou: boolean): void {
    if (lembrou) {
      setAcertos((current) => current + 1);
    }

    const proximoIndice = indiceAtual + 1;

    if (proximoIndice >= total) {
      setSessaoFinalizada(true);
      setVirado(false);
      return;
    }

    setIndiceAtual(proximoIndice);
    setVirado(false);
  }

  function reiniciar(): void {
    setIndiceAtual(0);
    setVirado(false);
    setAcertos(0);
    setTempoSegundos(0);
    setSessaoFinalizada(false);
    setProgressoSalvo(false);
  }

  return {
    flashcards,
    flashcardAtual,
    indiceAtual,
    total,
    virado,
    acertos,
    tempoSegundos,
    sessaoFinalizada,
    virarCarta,
    responder,
    reiniciar,
  };
}
