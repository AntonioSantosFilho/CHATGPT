import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type ExercicioResolvidoProps = {
  enunciado: string;
  passoAPasso: string;
  resolucaoLegivel: string;
  resolucaoLatex?: string;
  respostaFinal: string;
};

export function ExercicioResolvido({
  enunciado,
  passoAPasso,
  resolucaoLegivel,
  resolucaoLatex,
  respostaFinal,
}: ExercicioResolvidoProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View className="rounded-xl border border-border bg-card">
      <Pressable
        onPress={() => setExpanded((current) => !current)}
        className="flex-row items-center justify-between gap-4 rounded-t-xl bg-primaryLight px-4 py-4 active:opacity-80"
        accessibilityRole="button"
        accessibilityLabel="Exibir exercício resolvido"
        accessibilityState={{ expanded }}
      >
        <View className="flex-1">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Exercício resolvido
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted" numberOfLines={2}>
            {enunciado}
          </Text>
        </View>

        <View className="h-9 w-9 items-center justify-center rounded-full bg-secondary">
          <Text className="font-arial text-xl font-bold text-text">
            {expanded ? '−' : '+'}
          </Text>
        </View>
      </Pressable>

      {expanded ? (
        <View className="gap-4 p-4">
          <View>
            <Text className="font-arial text-sm font-bold text-primary">
              Enunciado
            </Text>
            <Text className="mt-1 font-arial text-sm leading-5 text-text">
              {enunciado}
            </Text>
          </View>

          <View>
            <Text className="font-arial text-sm font-bold text-primary">
              Passo a passo
            </Text>
            <Text className="mt-1 font-arial text-sm leading-5 text-textMuted">
              {passoAPasso}
            </Text>
          </View>

          <View className="rounded-lg bg-secondaryLight p-3">
            <Text className="font-arial text-sm font-bold text-primary">
              Resolução
            </Text>
            <Text className="mt-1 font-arial text-sm leading-5 text-text">
              {resolucaoLegivel}
            </Text>
          </View>

          {resolucaoLatex ? (
            <View className="rounded-lg border border-border bg-surface p-3">
              <Text className="font-arial text-xs font-bold uppercase tracking-widest text-textMuted">
                LaTeX
              </Text>
              <Text className="mt-1 font-arial text-sm leading-5 text-text">
                {resolucaoLatex}
              </Text>
            </View>
          ) : null}

          <View className="rounded-lg bg-secondary p-3">
            <Text className="font-arial text-sm font-bold text-text">
              Resposta final: {respostaFinal}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
