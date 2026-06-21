import { Text, View } from 'react-native';

import type { NivelDificuldade } from '../types';

type BadgeDificuldadeProps = {
  dificuldade: NivelDificuldade;
};

const badgeConfig: Record<
  NivelDificuldade,
  {
    label: string;
    className: string;
  }
> = {
  facil: {
    label: 'Fácil',
    className: 'bg-success border-success',
  },
  medio: {
    label: 'Médio',
    className: 'bg-secondary border-secondary',
  },
  dificil: {
    label: 'Difícil',
    className: 'bg-error border-error',
  },
};

export function BadgeDificuldade({
  dificuldade,
}: BadgeDificuldadeProps): JSX.Element {
  const config = badgeConfig[dificuldade];

  return (
    <View
      className={`self-start rounded-full border px-3 py-1 ${config.className}`}
    >
      <Text className="font-arial text-xs font-bold text-text">
        {config.label}
      </Text>
    </View>
  );
}
