import { Pressable, Text, View } from 'react-native';

type CartaMemoriaStatus = 'oculta' | 'revelada' | 'encontrada' | 'erro';

type CartaMemoriaProps = {
  conteudo: string;
  tipoConteudo: 'texto' | 'formula';
  status: CartaMemoriaStatus;
  onPress: () => void;
};

function getContainerClass(status: CartaMemoriaStatus): string {
  if (status === 'encontrada') {
    return 'border-success bg-successLight';
  }

  if (status === 'erro') {
    return 'border-error bg-errorLight';
  }

  if (status === 'revelada') {
    return 'border-primary bg-primaryLight';
  }

  return 'border-border bg-primary';
}

export function CartaMemoria({
  conteudo,
  tipoConteudo,
  status,
  onPress,
}: CartaMemoriaProps): JSX.Element {
  const revelada = status !== 'oculta';

  return (
    <Pressable
      onPress={onPress}
      className={`min-h-[112px] w-[48%] items-center justify-center rounded-xl border p-3 active:opacity-80 ${getContainerClass(
        status,
      )}`}
      accessibilityRole="button"
      accessibilityLabel={revelada ? conteudo : 'Carta oculta'}
    >
      {revelada ? (
        <View>
          <Text
            className={
              tipoConteudo === 'formula'
                ? 'text-center font-arial text-lg font-bold text-primary'
                : 'text-center font-arial text-sm font-bold leading-5 text-text'
            }
          >
            {conteudo}
          </Text>
        </View>
      ) : (
        <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Text className="font-arial text-2xl font-bold text-text">?</Text>
        </View>
      )}
    </Pressable>
  );
}
