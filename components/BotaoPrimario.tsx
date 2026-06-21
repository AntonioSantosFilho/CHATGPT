import { Pressable, Text } from 'react-native';

type BotaoPrimarioProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function BotaoPrimario({
  label,
  onPress,
  disabled = false,
}: BotaoPrimarioProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={
        disabled
          ? 'min-h-[48px] items-center justify-center rounded-lg bg-disabledBackground px-5 py-3'
          : 'min-h-[48px] items-center justify-center rounded-lg bg-primary px-5 py-3 active:opacity-80'
      }
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text
        className={
          disabled
            ? 'font-arial text-base font-bold text-disabledText'
            : 'font-arial text-base font-bold text-text'
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}
