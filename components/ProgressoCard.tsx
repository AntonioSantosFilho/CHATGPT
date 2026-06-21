import { Text, View } from 'react-native';

import type { EstatisticaModulo } from '../services/progressoService';

type ProgressoCardProps = {
  estatistica: EstatisticaModulo;
};

export function ProgressoCard({
  estatistica,
}: ProgressoCardProps): JSX.Element {
  return (
    <View className="rounded-xl border border-border bg-card p-4">
      <View className="mb-3 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-arial text-lg font-bold text-primary">
            {estatistica.modulo}
          </Text>

          <Text className="mt-1 font-arial text-sm text-textMuted">
            {estatistica.totalSessoes} sessões registradas
          </Text>
        </View>

        <View className="rounded-full bg-secondary px-3 py-2">
          <Text className="font-arial text-sm font-bold text-text">
            {estatistica.mediaAcertos}%
          </Text>
        </View>
      </View>

      <View className="gap-2">
        <Text className="font-arial text-sm text-textMuted">
          Acertos: {estatistica.totalAcertos}/{estatistica.totalItens}
        </Text>

        <Text className="font-arial text-sm text-textMuted">
          Tempo total: {estatistica.tempoTotalSegundos}s
        </Text>
      </View>
    </View>
  );
}
