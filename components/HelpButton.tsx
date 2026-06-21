import { Alert, Pressable, Text } from 'react-native';

type HelpButtonProps = {
  title?: string;
  message?: string;
};

const DEFAULT_HELP_TITLE = 'Como usar o FisicAI';

const DEFAULT_HELP_MESSAGE =
  'Use a tela inicial para acessar conteúdos, flashcards, questões, jogo da memória, simulações e progresso. Toque em um card para abrir o módulo desejado. Na aba Ajuda IA, você poderá tirar dúvidas sobre os assuntos estudados.';

export function HelpButton({
  title = DEFAULT_HELP_TITLE,
  message = DEFAULT_HELP_MESSAGE,
}: HelpButtonProps): JSX.Element {
  function handlePress(): void {
    Alert.alert(title, message, [{ text: 'Entendi' }]);
  }

  return (
    <Pressable
      onPress={handlePress}
      className="h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white shadow-sm active:scale-95"
      accessibilityRole="button"
      accessibilityLabel="Abrir ajuda"
      accessibilityHint="Mostra instruções básicas de uso do aplicativo"
    >
      <Text className="text-lg font-black text-blue-700">?</Text>
    </Pressable>
  );
}
