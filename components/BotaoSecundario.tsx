import { Pressable, Text } from 'react-native';

type BotaoSecundarioProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function BotaoSecundario({
  label,
  onPress,
  disabled = false,
}: BotaoSecundarioProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={
        disabled
          ? 'min-h-[48px] items-center justify-center rounded-lg border border-disabledText bg-disabledBackground px-5 py-3 opacity-70'
          : 'min-h-[48px] items-center justify-center rounded-lg border border-primary bg-primaryLight px-5 py-3 active:opacity-80'
      }
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text className="font-arial text-base font-bold text-primary">
        {label}
      </Text>
    </Pressable>
  );
}
