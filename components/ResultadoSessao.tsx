import { Text, View } from 'react-native';

import { BotaoPrimario } from './BotaoPrimario';

type ResultadoSessaoProps = {
  titulo: string;
  acertos: number;
  total: number;
  tempoSegundos: number;
  onContinuar: () => void;
  labelContinuar?: string;
};

export function ResultadoSessao({
  titulo,
  acertos,
  total,
  tempoSegundos,
  onContinuar,
  labelContinuar = 'Continuar',
}: ResultadoSessaoProps): JSX.Element {
  const erros = Math.max(total - acertos, 0);
  const pontuacao = total > 0 ? Math.round((acertos / total) * 100) : 0;

  return (
    <View className="flex-1 justify-center px-4">
      <View className="rounded-2xl border border-secondary bg-secondaryLight p-5">
        <Text className="text-center font-arial text-2xl font-bold text-text">
          {titulo}
        </Text>

        <View className="my-5 items-center">
          <View className="h-28 w-28 items-center justify-center rounded-full bg-secondary">
            <Text className="font-arial text-3xl font-bold text-text">
              {pontuacao}
            </Text>

            <Text className="font-arial text-xs font-bold text-text">
              pontos
            </Text>
          </View>
        </View>

        <View className="gap-2 rounded-xl bg-card p-4">
          <Text className="font-arial text-base font-bold text-primary">
            Acertos: {acertos}
          </Text>

          <Text className="font-arial text-base font-bold text-primary">
            Erros: {erros}
          </Text>

          <Text className="font-arial text-base font-bold text-primary">
            Total: {total}
          </Text>

          <Text className="font-arial text-base font-bold text-primary">
            Tempo: {tempoSegundos}s
          </Text>
        </View>
      </View>

      <View className="mt-5">
        <BotaoPrimario label={labelContinuar} onPress={onContinuar} />
      </View>
    </View>
  );
}
