import { Text, View } from 'react-native';

import type { MensagemIA } from '../types';

type BubbleChatProps = {
  mensagem: MensagemIA;
};

export function BubbleChat({ mensagem }: BubbleChatProps): JSX.Element {
  const isUsuario = mensagem.autor === 'usuario';

  return (
    <View className={isUsuario ? 'items-end' : 'items-start'}>
      <View
        className={
          isUsuario
            ? 'max-w-[86%] rounded-2xl rounded-br-sm bg-primary px-4 py-3'
            : 'max-w-[86%] rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3'
        }
      >
        <Text
          className={
            isUsuario
              ? 'font-arial text-sm leading-5 text-card'
              : 'font-arial text-sm leading-5 text-text'
          }
        >
          {mensagem.texto}
        </Text>
      </View>
    </View>
  );
}
