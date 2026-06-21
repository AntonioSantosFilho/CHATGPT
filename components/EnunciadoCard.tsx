import { Text, View } from 'react-native';

import { BadgeDificuldade } from './BadgeDificuldade';
import type { NivelDificuldade } from '../types';

type EnunciadoCardProps = {
  titulo: string;
  enunciado: string;
  dificuldade: NivelDificuldade;
  tipo?: string;
  fonte?: string;
};

export function EnunciadoCard({
  titulo,
  enunciado,
  dificuldade,
  tipo,
  fonte,
}: EnunciadoCardProps): JSX.Element {
  return (
    <View className="rounded-xl border border-border bg-card p-4">
      <View className="mb-3 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            {tipo ?? 'Questão'}
          </Text>

          <Text className="mt-1 font-arial text-xl font-bold leading-7 text-primary">
            {titulo}
          </Text>
        </View>

        <BadgeDificuldade dificuldade={dificuldade} />
      </View>

      <Text className="font-arial text-base leading-6 text-text">
        {enunciado}
      </Text>

      {fonte ? (
        <Text className="mt-4 font-arial text-xs leading-4 text-textMuted">
          Fonte: {fonte}
        </Text>
      ) : null}
    </View>
  );
}
