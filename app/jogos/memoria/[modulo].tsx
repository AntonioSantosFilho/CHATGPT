import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { BotaoReiniciar } from '../../../components/BotaoReiniciar';
import { CartaMemoria } from '../../../components/CartaMemoria';
import { FeedbackModal } from '../../../components/FeedbackModal';
import { Header } from '../../../components/Header';
import { useMemoriaGame } from '../../../hooks/useMemoriaGame';
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

export default function MemoriaJogoScreen(): JSX.Element {
  const { modulo, dificuldade } = useLocalSearchParams<{
    modulo?: string;
    dificuldade?: string;
  }>();

  const moduloParam = Array.isArray(modulo) ? modulo[0] : modulo ?? '';
  const dificuldadeParam = normalizarDificuldade(dificuldade);

  const {
    cartas,
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
  } = useMemoriaGame(moduloParam, dificuldadeParam);

  return (
    <View className="flex-1 bg-background">
      <Header title="Memória" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            {moduloParam}
          </Text>

          <Text className="mt-2 font-arial text-lg font-bold text-text">
            Pares encontrados: {acertos}/{totalPares}
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted">
            Tempo: {tempoSegundos}s
          </Text>
        </View>

        {finalizado ? (
          <View className="mb-4 rounded-2xl border border-secondary bg-secondaryLight p-5">
            <Text className="text-center font-arial text-2xl font-bold text-text">
              Jogo concluído!
            </Text>

            <Text className="mt-3 text-center font-arial text-base leading-6 text-textMuted">
              Você encontrou todos os pares em {tempoSegundos} segundos.
            </Text>
          </View>
        ) : null}

        {cartas.length === 0 ? (
          <View className="rounded-xl border border-border bg-card p-5">
            <Text className="text-center font-arial text-xl font-bold text-primary">
              Nenhum par encontrado
            </Text>

            <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
              Não há cartas para este módulo e dificuldade.
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {cartas.map((carta) => {
              const encontrada = cartaEstaEncontrada(carta);
              const erro = cartaEstaComErro(carta);
              const revelada = cartaEstaRevelada(carta);

              return (
                <CartaMemoria
                  key={carta.id}
                  conteudo={carta.conteudo}
                  tipoConteudo={carta.tipoConteudo}
                  status={
                    encontrada
                      ? 'encontrada'
                      : erro
                        ? 'erro'
                        : revelada
                          ? 'revelada'
                          : 'oculta'
                  }
                  onPress={() => selecionarCarta(carta.id)}
                />
              );
            })}
          </View>
        )}

        <View className="mt-5">
          <BotaoReiniciar onPress={reiniciar} label="Reiniciar jogo" />
        </View>
      </ScrollView>

      <FeedbackModal
        visible={feedback.visivel}
        tipo={feedback.tipo}
        titulo={feedback.titulo}
        explicacao={feedback.explicacao}
        onClose={fecharFeedback}
      />
    </View>
  );
}
