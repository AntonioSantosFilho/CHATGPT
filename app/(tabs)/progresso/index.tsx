import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { GraficoAcertos } from '../../../components/GraficoAcertos';
import { Header } from '../../../components/Header';
import { ProgressoCard } from '../../../components/ProgressoCard';
import {
  obterEstatisticasPorModulo,
  obterUltimasSessoes,
  type EstatisticaModulo,
  type RegistroProgressoSessao,
} from '../../../services/progressoService';

function formatarTipo(tipo: RegistroProgressoSessao['tipo']): string {
  const labels: Record<RegistroProgressoSessao['tipo'], string> = {
    flashcards: 'Flashcards',
    memoria: 'Memória',
    quiz: 'Quiz',
    desafio: 'Desafio',
    lacunas: 'Lacunas',
  };

  return labels[tipo];
}

export default function ProgressoScreen(): JSX.Element {
  const [estatisticas, setEstatisticas] = useState<EstatisticaModulo[]>([]);
  const [ultimasSessoes, setUltimasSessoes] = useState<
    RegistroProgressoSessao[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarProgresso(): Promise<void> {
        const [estatisticasModulo, sessoesRecentes] = await Promise.all([
          obterEstatisticasPorModulo(),
          obterUltimasSessoes(5),
        ]);

        setEstatisticas(estatisticasModulo);
        setUltimasSessoes(sessoesRecentes);
      }

      void carregarProgresso();
    }, []),
  );

  const totalSessoes = estatisticas.reduce(
    (total, item) => total + item.totalSessoes,
    0,
  );
  const tempoTotal = estatisticas.reduce(
    (total, item) => total + item.tempoTotalSegundos,
    0,
  );
  const totalAcertos = estatisticas.reduce(
    (total, item) => total + item.totalAcertos,
    0,
  );
  const totalItens = estatisticas.reduce(
    (total, item) => total + item.totalItens,
    0,
  );
  const mediaGeral =
    totalItens > 0 ? Math.round((totalAcertos / totalItens) * 100) : 0;

  return (
    <View className="flex-1 bg-background">
      <Header title="Progresso" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-xl border border-secondary bg-secondaryLight p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Desempenho geral
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold text-text">
            {mediaGeral}% de média
          </Text>

          <Text className="mt-2 font-arial text-sm leading-5 text-textMuted">
            {totalSessoes} sessões concluídas · {tempoTotal}s de estudo
            registrados.
          </Text>
        </View>

        <GraficoAcertos dados={estatisticas} />

        <View>
          <Text className="mb-3 font-arial text-xl font-bold text-primary">
            Progresso por módulo
          </Text>

          <View className="gap-3">
            {estatisticas.length > 0 ? (
              estatisticas.map((estatistica) => (
                <ProgressoCard
                  key={estatistica.modulo}
                  estatistica={estatistica}
                />
              ))
            ) : (
              <View className="rounded-xl border border-border bg-card p-4">
                <Text className="text-center font-arial text-sm text-textMuted">
                  Nenhuma sessão registrada ainda. Conclua jogos, quizzes ou
                  flashcards para acompanhar seu progresso.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View>
          <Text className="mb-3 font-arial text-xl font-bold text-primary">
            Últimas sessões
          </Text>

          <View className="gap-3">
            {ultimasSessoes.map((sessao) => (
              <View
                key={sessao.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <View className="mb-2 flex-row items-center justify-between gap-3">
                  <Text className="flex-1 font-arial text-base font-bold text-primary">
                    {formatarTipo(sessao.tipo)}
                  </Text>

                  <View className="rounded-full bg-secondary px-3 py-1">
                    <Text className="font-arial text-xs font-bold text-text">
                      {sessao.acertos}/{sessao.total}
                    </Text>
                  </View>
                </View>

                <Text className="font-arial text-sm text-textMuted">
                  {sessao.modulo} · {sessao.dificuldade} · {sessao.tempoSegundos}s
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
