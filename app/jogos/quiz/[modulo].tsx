import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AlternativaButton } from '../../../components/AlternativaButton';
import { BotaoReiniciar } from '../../../components/BotaoReiniciar';
import { EnunciadoCard } from '../../../components/EnunciadoCard';
import { FeedbackModal } from '../../../components/FeedbackModal';
import { Header } from '../../../components/Header';
import { ResultadoSessao } from '../../../components/ResultadoSessao';
import {
  useQuizSession,
  type DificuldadeFiltro,
} from '../../../hooks/useQuizSession';

function normalizarDificuldade(
  value: string | string[] | undefined,
): DificuldadeFiltro {
  const raw = Array.isArray(value) ? value[0] : value;

  if (
    raw === 'facil' ||
    raw === 'medio' ||
    raw === 'dificil' ||
    raw === 'todas'
  ) {
    return raw;
  }

  return 'todas';
}

export default function QuizSessaoScreen(): JSX.Element {
  const { modulo, dificuldade } = useLocalSearchParams<{
    modulo?: string;
    dificuldade?: string;
  }>();

  const moduloId = Array.isArray(modulo) ? modulo[0] : modulo ?? '';
  const dificuldadeParam = normalizarDificuldade(dificuldade);

  const {
    modulo: moduloInfo,
    questaoAtual,
    indiceAtual,
    total,
    respostaSelecionada,
    acertos,
    tempoSegundos,
    finalizado,
    feedback,
    responder,
    avancar,
    reiniciar,
  } = useQuizSession({
    moduloId,
    dificuldade: dificuldadeParam,
    tipoSessao: 'quiz',
  });

  if (finalizado) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Resultado" showBackButton />

        <ResultadoSessao
          titulo="Quiz finalizado!"
          acertos={acertos}
          total={total}
          tempoSegundos={tempoSegundos}
          onContinuar={() => router.back()}
          labelContinuar="Voltar"
        />
      </View>
    );
  }

  if (!questaoAtual) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Quiz" showBackButton />

        <View className="flex-1 justify-center px-6">
          <Text className="text-center font-arial text-xl font-bold text-primary">
            Nenhuma questão encontrada
          </Text>

          <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
            Não existem questões para este módulo e dificuldade.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Quiz" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            {moduloInfo?.titulo ?? moduloId}
          </Text>

          <Text className="mt-2 font-arial text-lg font-bold text-text">
            Questão {indiceAtual + 1} de {total}
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted">
            Acertos: {acertos} · Tempo: {tempoSegundos}s
          </Text>
        </View>

        <EnunciadoCard
          titulo="Responda a questão"
          enunciado={questaoAtual.enunciado}
          dificuldade={questaoAtual.dificuldade}
          tipo={
            questaoAtual.tipo === 'calculo'
              ? 'Cálculo'
              : 'Múltipla escolha'
          }
          fonte={questaoAtual.fonte}
        />

        <View className="gap-3">
          {questaoAtual.alternativas.map((alternativa) => {
            const selecionada = respostaSelecionada === alternativa.letra;
            const correta = questaoAtual.resposta_correta === alternativa.letra;

            return (
              <AlternativaButton
                key={alternativa.letra}
                letra={alternativa.letra}
                texto={alternativa.texto}
                disabled={respostaSelecionada !== null}
                status={
                  respostaSelecionada === null
                    ? 'neutro'
                    : correta
                      ? 'correto'
                      : selecionada
                        ? 'incorreto'
                        : 'neutro'
                }
                onPress={() => responder(alternativa.letra)}
              />
            );
          })}
        </View>

        <BotaoReiniciar onPress={reiniciar} label="Reiniciar quiz" />
      </ScrollView>

      <FeedbackModal
        visible={feedback.visivel}
        tipo={feedback.tipo}
        titulo={feedback.titulo}
        explicacao={feedback.explicacao}
        onClose={avancar}
      />
    </View>
  );
}
