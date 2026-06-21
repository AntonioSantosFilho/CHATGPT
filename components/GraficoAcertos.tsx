import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../constants/Colors';
import type { EstatisticaModulo } from '../services/progressoService';

type GraficoAcertosProps = {
  dados: EstatisticaModulo[];
};

export function GraficoAcertos({ dados }: GraficoAcertosProps): JSX.Element {
  if (dados.length === 0) {
    return (
      <View className="rounded-xl border border-border bg-card p-4">
        <Text className="text-center font-arial text-sm text-textMuted">
          Ainda não há dados suficientes para gerar o gráfico.
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded-xl border border-border bg-card p-4">
      <Text className="mb-4 font-arial text-lg font-bold text-primary">
        Média de acertos por módulo
      </Text>

      <View className="gap-4">
        {dados.map((item) => (
          <View key={item.modulo}>
            <View className="mb-1 flex-row items-center justify-between gap-3">
              <Text
                className="flex-1 font-arial text-sm font-bold text-text"
                numberOfLines={1}
              >
                {item.modulo}
              </Text>

              <Text className="font-arial text-sm font-bold text-primary">
                {item.mediaAcertos}%
              </Text>
            </View>

            <View className="h-4 overflow-hidden rounded-full bg-primaryLight">
              <View
                style={{
                  width: `${Math.max(item.mediaAcertos, 2)}%`,
                  backgroundColor:
                    item.mediaAcertos >= 70 ? colors.secondary : colors.primary,
                }}
                className="h-4 rounded-full"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
