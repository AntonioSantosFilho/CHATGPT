import { Pressable, Text, View } from 'react-native';

type AlternativaStatus = 'neutro' | 'correto' | 'incorreto';

type AlternativaButtonProps = {
  letra: string;
  texto: string;
  status?: AlternativaStatus;
  disabled?: boolean;
  onPress: () => void;
};

function getContainerClass(status: AlternativaStatus): string {
  if (status === 'correto') {
    return 'border-success bg-successLight';
  }

  if (status === 'incorreto') {
    return 'border-error bg-errorLight';
  }

  return 'border-border bg-card';
}

export function AlternativaButton({
  letra,
  texto,
  status = 'neutro',
  disabled = false,
  onPress,
}: AlternativaButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`rounded-xl border p-4 active:opacity-80 ${getContainerClass(
        status,
      )}`}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={`Alternativa ${letra}: ${texto}`}
    >
      <View className="flex-row items-start gap-3">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
          <Text className="font-arial text-sm font-bold text-text">
            {letra}
          </Text>
        </View>

        <Text className="flex-1 font-arial text-sm leading-5 text-text">
          {texto}
        </Text>
      </View>
    </Pressable>
  );
}
