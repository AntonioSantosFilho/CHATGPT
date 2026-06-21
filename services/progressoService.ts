import AsyncStorage from '@react-native-async-storage/async-storage';

import type { NivelDificuldade } from '../types';

const STORAGE_KEY = '@fisicai:progresso-sessoes';

export type TipoSessaoProgresso =
  | 'flashcards'
  | 'memoria'
  | 'quiz'
  | 'desafio'
  | 'lacunas';

export type DificuldadeProgresso = NivelDificuldade | 'todas';

export type RegistroProgressoSessao = {
  id: string;
  tipo: TipoSessaoProgresso;
  modulo: string;
  dificuldade: DificuldadeProgresso;
  acertos: number;
  total: number;
  tempoSegundos: number;
  criadoEm: string;
};

export type EstatisticaModulo = {
  modulo: string;
  totalSessoes: number;
  totalAcertos: number;
  totalItens: number;
  mediaAcertos: number;
  tempoTotalSegundos: number;
};

async function listarRegistros(): Promise<RegistroProgressoSessao[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as RegistroProgressoSessao[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function salvarProgressoSessao(
  registro: Omit<RegistroProgressoSessao, 'id' | 'criadoEm'>,
): Promise<RegistroProgressoSessao> {
  const registros = await listarRegistros();

  const novoRegistro: RegistroProgressoSessao = {
    ...registro,
    id: `${registro.tipo}-${registro.modulo}-${Date.now()}`,
    criadoEm: new Date().toISOString(),
  };

  const atualizados = [novoRegistro, ...registros];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));

  return novoRegistro;
}

export async function obterProgressoSessoes(): Promise<
  RegistroProgressoSessao[]
> {
  return listarRegistros();
}

export async function obterUltimasSessoes(
  limite = 5,
): Promise<RegistroProgressoSessao[]> {
  const registros = await listarRegistros();

  return registros
    .sort(
      (a, b) =>
        new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
    )
    .slice(0, limite);
}

export async function obterEstatisticasPorModulo(): Promise<
  EstatisticaModulo[]
> {
  const registros = await listarRegistros();
  const mapa = new Map<string, EstatisticaModulo>();

  registros.forEach((registro) => {
    const atual = mapa.get(registro.modulo) ?? {
      modulo: registro.modulo,
      totalSessoes: 0,
      totalAcertos: 0,
      totalItens: 0,
      mediaAcertos: 0,
      tempoTotalSegundos: 0,
    };

    atual.totalSessoes += 1;
    atual.totalAcertos += registro.acertos;
    atual.totalItens += registro.total;
    atual.tempoTotalSegundos += registro.tempoSegundos;
    atual.mediaAcertos =
      atual.totalItens > 0
        ? Math.round((atual.totalAcertos / atual.totalItens) * 100)
        : 0;

    mapa.set(registro.modulo, atual);
  });

  return Array.from(mapa.values()).sort(
    (a, b) => b.totalSessoes - a.totalSessoes,
  );
}

export async function limparProgressoSessoes(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
