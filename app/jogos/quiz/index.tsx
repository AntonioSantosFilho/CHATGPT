import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BadgeDificuldade } from '../../../components/BadgeDificuldade';
import { Header } from '../../../components/Header';
import {
  listarModulosQuestoes,
  type DificuldadeFiltro,
} from '../../../hooks/useQuizSession';
import type { NivelDificuldade } from '../../../types';

const dificuldades: DificuldadeFiltro[] = ['todas', 'facil', 'medio', 'dificil'];

function DificuldadeChip({
  dificuldade,
}: {
  dificuldade: DificuldadeFiltro;
}): JSX.Element {
  if (dificuldade === 'todas') {
    return (
      <View className="self-start rounded-full bg-secondary px-3 py-1">
        <Text className="font-arial text-xs font-bold text-text">Todas</Text>
      </View>
    );
  }

  return <BadgeDificuldade dificuldade={dificuldade} />;
}

function contarPorDificuldade(
  questoes: Array<{ dificuldade: NivelDificuldade }>,
  dificuldade: DificuldadeFiltro,
): number {
  if (dificuldade === 'todas') {
    return questoes.length;
  }

  return questoes.filter((questao) => questao.dificuldade === dificuldade)
    .length;
}

export default function QuizPreparacaoScreen(): JSX.Element {
  const modulos = listarModulosQuestoes();

  return (
    <View className="flex-1 bg-background">
      <Header title="Quiz" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Avaliação
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
            Escolha um módulo e a dificuldade.
          </Text>

          <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
            As perguntas aparecem em sequência definida pelo sistema. Você não
            precisa escolher questões individualmente.
          </Text>
        </View>

        <View className="gap-4">
          {modulos.map((modulo) => (
            <View
              key={modulo.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <Text className="font-arial text-xl font-bold text-primary">
                {modulo.titulo}
              </Text>

              <Text className="mt-1 font-arial text-sm leading-5 text-textMuted">
                {modulo.descricao}
              </Text>

              <View className="mt-4 gap-3">
                {dificuldades.map((dificuldade) => {
                  const total = contarPorDificuldade(
                    modulo.questoes,
                    dificuldade,
                  );

                  if (total === 0) {
                    return null;
                  }

                  return (
                    <View
                      key={dificuldade}
                      className="rounded-xl border border-border bg-primaryLight p-3"
                    >
                      <View className="mb-3 flex-row items-center justify-between">
                        <DificuldadeChip dificuldade={dificuldade} />

                        <Text className="font-arial text-xs font-bold text-primary">
                          {total} questões
                        </Text>
                      </View>

                      <View className="gap-2">
                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: '/jogos/quiz/[modulo]',
                              params: {
                                modulo: modulo.id,
                                dificuldade,
                              },
                            })
                          }
                          className="rounded-lg bg-primary px-4 py-3 active:opacity-80"
                          accessibilityRole="button"
                        >
                          <Text className="text-center font-arial text-sm font-bold text-text">
                            Iniciar quiz
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: '/jogos/desafio/[modulo]',
                              params: {
                                modulo: modulo.id,
                                dificuldade,
                              },
                            })
                          }
                          className="rounded-lg border border-primary bg-primaryLight px-4 py-3 active:opacity-80"
                          accessibilityRole="button"
                        >
                          <Text className="text-center font-arial text-sm font-bold text-primary">
                            Desafio sequencial
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: '/jogos/lacunas/[modulo]',
                              params: {
                                modulo: modulo.id,
                                dificuldade,
                              },
                            })
                          }
                          className="rounded-lg bg-secondary px-4 py-3 active:opacity-80"
                          accessibilityRole="button"
                        >
                          <Text className="text-center font-arial text-sm font-bold text-text">
                            Completar lacunas
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
