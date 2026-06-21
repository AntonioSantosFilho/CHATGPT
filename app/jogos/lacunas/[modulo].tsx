import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { BotaoPrimario } from '../../../components/BotaoPrimario';
import { BotaoReiniciar } from '../../../components/BotaoReiniciar';
import { EnunciadoCard } from '../../../components/EnunciadoCard';
import { FeedbackModal } from '../../../components/FeedbackModal';
import { Header } from '../../../components/Header';
import { ResultadoSessao } from '../../../components/ResultadoSessao';
import { useLacunasSession } from '../../../hooks/useLacunasSession';
import type { DificuldadeFiltro } from '../../../hooks/useQuizSession';

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

export default function LacunasSessaoScreen(): JSX.Element {
  const { modulo, dificuldade } = useLocalSearchParams<{
    modulo?: string;
    dificuldade?: string;
  }>();

  const moduloId = Array.isArray(modulo) ? modulo[0] : modulo ?? '';
  const dificuldadeParam = normalizarDificuldade(dificuldade);

  const {
    lacunaAtual,
    indiceAtual,
    total,
    respostaDigitada,
    respostaEnviada,
    acertos,
    tempoSegundos,
    finalizado,
    feedback,
    setRespostaDigitada,
    validarResposta,
    avancar,
    reiniciar,
  } = useLacunasSession({
    moduloId,
    dificuldade: dificuldadeParam,
  });

  if (finalizado) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Resultado" showBackButton />

        <ResultadoSessao
          titulo="Lacunas finalizadas!"
          acertos={acertos}
          total={total}
          tempoSegundos={tempoSegundos}
          onContinuar={() => router.back()}
          labelContinuar="Voltar"
        />
      </View>
    );
  }

  if (!lacunaAtual) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Lacunas" showBackButton />

        <View className="flex-1 justify-center px-6">
          <Text className="text-center font-arial text-xl font-bold text-primary">
            Nenhuma lacuna encontrada
          </Text>

          <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
            Não existem lacunas para este módulo e dificuldade.
          </Text>
        </View>
      </View>
    );
  }

  const inputDisabled = respostaEnviada !== null;

  return (
    <View className="flex-1 bg-background">
      <Header title="Completar lacunas" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            {moduloId}
          </Text>

          <Text className="mt-2 font-arial text-lg font-bold text-text">
            Lacuna {indiceAtual + 1} de {total}
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted">
            Acertos: {acertos} · Tempo: {tempoSegundos}s
          </Text>
        </View>

        <EnunciadoCard
          titulo="Complete a frase"
          enunciado={lacunaAtual.frase}
          dificuldade={lacunaAtual.dificuldade}
          tipo="Lacuna"
          fonte={lacunaAtual.fonte}
        />

        <View className="rounded-xl border border-border bg-card p-4">
          <Text className="font-arial text-sm font-bold text-primary">
            Sua resposta
          </Text>

          <TextInput
            value={respostaDigitada}
            onChangeText={setRespostaDigitada}
            editable={!inputDisabled}
            placeholder="Digite a palavra ou símbolo"
            placeholderTextColor="#4b5563"
            className="mt-3 min-h-[52px] rounded-lg border border-border bg-surface px-4 font-arial text-base text-text"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View className="mt-4">
            <BotaoPrimario
              label="Verificar resposta"
              onPress={validarResposta}
              disabled={inputDisabled || respostaDigitada.trim().length === 0}
            />
          </View>
        </View>

        <BotaoReiniciar onPress={reiniciar} label="Reiniciar lacunas" />
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
