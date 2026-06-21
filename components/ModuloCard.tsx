import { Pressable, Text, View } from 'react-native';

type ModuloCardProps = {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
};

export function ModuloCard({
  title,
  description,
  icon,
  onPress,
}: ModuloCardProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      className="w-[48%] overflow-hidden rounded-xl border border-border bg-card active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel={`Abrir módulo ${title}`}
      accessibilityHint={description}
    >
      <View className="bg-primary px-3 py-3">
        <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-secondary">
          <Text className="font-arial text-2xl text-text">{icon}</Text>
        </View>

        <Text
          className="font-arial text-base font-bold text-text"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>

      <View className="min-h-[92px] bg-card px-3 py-3">
        <Text className="font-arial text-sm leading-5 text-textMuted">
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
