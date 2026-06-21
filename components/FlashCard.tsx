import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

type FlashCardProps = {
  frente: string;
  verso: string;
  tipo: string;
  fonte: string;
  virado: boolean;
  onPress: () => void;
};

export function FlashCard({
  frente,
  verso,
  tipo,
  fonte,
  virado,
  onPress,
}: FlashCardProps): JSX.Element {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: virado ? 1 : 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [animation, virado]);

  const frontRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Virar flashcard"
      className="min-h-[320px]"
    >
      <View className="relative min-h-[320px]">
        <Animated.View
          className="absolute inset-0 rounded-2xl border border-border bg-card p-5"
          style={{
            backfaceVisibility: 'hidden',
            transform: [{ rotateY: frontRotation }],
          }}
        >
          <View className="mb-4 self-start rounded-full bg-secondary px-3 py-1">
            <Text className="font-arial text-xs font-bold uppercase tracking-wide text-text">
              {tipo}
            </Text>
          </View>

          <View className="flex-1 justify-center">
            <Text className="text-center font-arial text-2xl font-bold leading-9 text-primary">
              {frente}
            </Text>
          </View>

          <Text className="text-center font-arial text-sm text-textMuted">
            Toque para revelar a resposta
          </Text>
        </Animated.View>

        <Animated.View
          className="absolute inset-0 rounded-2xl border border-primary bg-primaryLight p-5"
          style={{
            backfaceVisibility: 'hidden',
            transform: [{ rotateY: backRotation }],
          }}
        >
          <View className="mb-4 self-start rounded-full bg-secondary px-3 py-1">
            <Text className="font-arial text-xs font-bold uppercase tracking-wide text-text">
              Resposta
            </Text>
          </View>

          <View className="flex-1 justify-center">
            <Text className="text-center font-arial text-xl font-bold leading-8 text-text">
              {verso}
            </Text>
          </View>

          <Text className="text-center font-arial text-xs leading-4 text-textMuted">
            Fonte: {fonte}
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}
