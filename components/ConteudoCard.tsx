import { Pressable, Text, View } from 'react-native';

import { BadgeDificuldade } from './BadgeDificuldade';
import type { NivelDificuldade } from '../types';

type ConteudoCardProps = {
  titulo: string;
  conceito: string;
  dificuldade: NivelDificuldade;
  onPress: () => void;
};

export function ConteudoCard({
  titulo,
  conceito,
  dificuldade,
  onPress,
}: ConteudoCardProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl border border-border bg-card p-4 active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel={`Abrir conteúdo ${titulo}`}
      accessibilityHint={conceito}
    >
      <View className="mb-3 flex-row items-start justify-between gap-3">
        <Text
          className="flex-1 font-arial text-lg font-bold text-primary"
          numberOfLines={2}
        >
          {titulo}
        </Text>

        <BadgeDificuldade dificuldade={dificuldade} />
      </View>

      <Text className="font-arial text-sm leading-5 text-textMuted" numberOfLines={3}>
        {conceito}
      </Text>
    </Pressable>
  );
}
