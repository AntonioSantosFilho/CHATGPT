import { BotaoSecundario } from './BotaoSecundario';

type BotaoReiniciarProps = {
  onPress: () => void;
  label?: string;
};

export function BotaoReiniciar({
  onPress,
  label = 'Reiniciar',
}: BotaoReiniciarProps): JSX.Element {
  return <BotaoSecundario label={label} onPress={onPress} />;
}
