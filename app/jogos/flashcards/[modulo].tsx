import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { BotaoPrimario } from '../../../components/BotaoPrimario';
import { BotaoReiniciar } from '../../../components/BotaoReiniciar';
import { FlashCard } from '../../../components/FlashCard';
import { Header } from '../../../components/Header';
import { useFlashcardSession } from '../../../hooks/useFlashcardSession';
import type { NivelDificuldade } from '../../../types';

function normalizarDificuldade(
  value: string | string[] | undefined,
): NivelDificuldade {
  const raw = Array.isArray(value) ? value[0] : value;

  if (raw === 'medio' || raw === 'dificil' || raw === 'facil') {
    return raw;
  }

  return 'facil';
}

export default function FlashcardSessaoScreen(): JSX.Element {
  const { modulo, dificuldade } = useLocalSearchParams<{
    modulo?: string;
    dificuldade?: string;
  }>();

  const moduloParam = Array.isArray(modulo) ? modulo[0] : modulo ?? '';
  const dificuldadeParam = normalizarDificuldade(dificuldade);

  const {
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
  } = useFlashcardSession(moduloParam, dificuldadeParam);

  if (!flashcardAtual && !sessaoFinalizada) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Flashcards" showBackButton />

        <View className="flex-1 justify-center px-6">
          <Text className="text-center font-arial text-xl font-bold text-primary">
            Nenhum flashcard encontrado
          </Text>

          <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
            Não há cartas para este módulo e dificuldade.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Sessão" showBackButton />

      <View className="flex-1 px-4 pb-8 pt-5">
        <View className="mb-4 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            {moduloParam}
          </Text>

          <Text className="mt-2 font-arial text-lg font-bold text-text">
            {sessaoFinalizada
              ? 'Sessão concluída'
              : `Carta ${indiceAtual + 1} de ${total}`}
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted">
            Acertos: {acertos}/{total} · Tempo: {tempoSegundos}s
          </Text>
        </View>

        {sessaoFinalizada ? (
          <View className="flex-1 justify-center">
            <View className="rounded-2xl border border-secondary bg-secondaryLight p-5">
              <Text className="text-center font-arial text-2xl font-bold text-text">
                Revisão finalizada!
              </Text>

              <Text className="mt-3 text-center font-arial text-base leading-6 text-textMuted">
                Você marcou {acertos} de {total} flashcards como lembrados em{' '}
                {tempoSegundos} segundos.
              </Text>
            </View>

            <View className="mt-5">
              <BotaoReiniciar onPress={reiniciar} label="Reiniciar sessão" />
            </View>
          </View>
        ) : (
          <>
            <FlashCard
              frente={flashcardAtual.frente}
              verso={flashcardAtual.verso}
              tipo={flashcardAtual.tipo}
              fonte={flashcardAtual.fonte}
              virado={virado}
              onPress={virarCarta}
            />

            <View className="mt-5 gap-3">
              <BotaoPrimario
                label="Lembrei"
                onPress={() => responder(true)}
                disabled={!virado}
              />

              <BotaoReiniciar
                onPress={() => responder(false)}
                label="Preciso revisar"
              />

              <BotaoReiniciar onPress={reiniciar} label="Reiniciar sessão" />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
