import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export function Header({
  title,
  showBackButton = false,
}: HeaderProps): JSX.Element {
  function handleBack(): void {
    router.back();
  }

  return (
    <View className="bg-primaryLight">
      <View className="relative min-h-[76px] flex-row items-center px-4 pt-5">
        <View className="z-10 flex-row items-center">
          {showBackButton ? (
            <Pressable
              onPress={handleBack}
              className="mr-2 h-11 w-11 items-center justify-center rounded-full bg-secondary active:opacity-80"
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              accessibilityHint="Retorna para a tela anterior"
            >
              <Text className="font-arial text-xl font-bold text-text">‹</Text>
            </Pressable>
          ) : null}

          <Image
            source={require('../assets/images/logo-univasf.png')}
            resizeMode="contain"
            style={{ width: 156, height: 30 }}
            accessibilityLabel="Logo da UNIVASF"
          />
        </View>

        <View className="absolute left-0 right-0 top-5 min-h-[56px] items-center justify-center px-[190px]">
          <Text
            className="font-arial text-lg font-bold text-primary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
      </View>

      <View className="h-1.5 bg-secondary" />
    </View>
  );
}
