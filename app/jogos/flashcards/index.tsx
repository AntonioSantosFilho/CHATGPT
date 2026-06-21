import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { BadgeDificuldade } from '../../../components/BadgeDificuldade';
import { Header } from '../../../components/Header';
import { listarModulosFlashcards } from '../../../hooks/useFlashcardSession';
import type { NivelDificuldade } from '../../../types';

const dificuldades: NivelDificuldade[] = ['facil', 'medio', 'dificil'];

export default function FlashcardsIndexScreen(): JSX.Element {
  const modulos = listarModulosFlashcards();

  return (
    <View className="flex-1 bg-background">
      <Header title="Flashcards" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Revisão rápida
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
            Escolha o módulo e a dificuldade.
          </Text>

          <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
            A sequência dos flashcards é definida pelo sistema para manter uma
            progressão guiada de estudo.
          </Text>
        </View>

        <View className="gap-4">
          {modulos.map((modulo) => (
            <View
              key={modulo.modulo}
              className="rounded-xl border border-border bg-card p-4"
            >
              <Text className="font-arial text-xl font-bold text-primary">
                {modulo.modulo}
              </Text>

              <Text className="mt-1 font-arial text-sm text-textMuted">
                {modulo.flashcards.length} flashcards disponíveis
              </Text>

              <View className="mt-4 flex-row flex-wrap gap-2">
                {dificuldades.map((dificuldade) => {
                  const total = modulo.flashcards.filter(
                    (flashcard) => flashcard.dificuldade === dificuldade,
                  ).length;

                  if (total === 0) {
                    return null;
                  }

                  return (
                    <Pressable
                      key={dificuldade}
                      onPress={() =>
                        router.push({
                          pathname: '/jogos/flashcards/[modulo]',
                          params: {
                            modulo: modulo.modulo,
                            dificuldade,
                          },
                        })
                      }
                      className="rounded-xl border border-border bg-primaryLight p-3 active:opacity-80"
                      accessibilityRole="button"
                      accessibilityLabel={`Iniciar flashcards ${modulo.modulo} ${dificuldade}`}
                    >
                      <BadgeDificuldade dificuldade={dificuldade} />

                      <Text className="mt-2 font-arial text-xs font-bold text-primary">
                        {total} cartas
                      </Text>
                    </Pressable>
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
