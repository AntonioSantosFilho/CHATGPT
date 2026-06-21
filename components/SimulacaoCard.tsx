import { Pressable, Text, View } from 'react-native';

type SimulacaoCardProps = {
  nome: string;
  tema: string;
  descricao: string;
  onPress: () => void;
};

export function SimulacaoCard({
  nome,
  tema,
  descricao,
  onPress,
}: SimulacaoCardProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-xl border border-border bg-card active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel={`Abrir simulação ${nome}`}
      accessibilityHint={descricao}
    >
      <View className="bg-primary px-4 py-4">
        <View className="mb-3 self-start rounded-full bg-secondary px-3 py-1">
          <Text className="font-arial text-xs font-bold uppercase tracking-wide text-text">
            {tema}
          </Text>
        </View>

        <Text className="font-arial text-lg font-bold text-text" numberOfLines={2}>
          {nome}
        </Text>
      </View>

      <View className="bg-card p-4">
        <Text className="font-arial text-sm leading-5 text-textMuted">
          {descricao}
        </Text>
      </View>
    </Pressable>
  );
}
