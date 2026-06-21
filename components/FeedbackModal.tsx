import { Modal, Pressable, Text, View } from 'react-native';

type FeedbackModalProps = {
  visible: boolean;
  tipo: 'acerto' | 'erro';
  titulo: string;
  explicacao: string;
  onClose: () => void;
};

export function FeedbackModal({
  visible,
  tipo,
  titulo,
  explicacao,
  onClose,
}: FeedbackModalProps): JSX.Element {
  const isAcerto = tipo === 'acerto';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-text/40 px-5">
        <View className="w-full rounded-2xl border border-border bg-card p-5">
          <View
            className={
              isAcerto
                ? 'mb-4 rounded-xl bg-successLight p-4'
                : 'mb-4 rounded-xl bg-errorLight p-4'
            }
          >
            <Text className="font-arial text-2xl font-bold text-text">
              {titulo}
            </Text>

            <Text className="mt-2 font-arial text-sm leading-5 text-textMuted">
              {explicacao}
            </Text>
          </View>

          {!isAcerto ? (
            <View className="mb-4 rounded-xl border border-secondary bg-secondaryLight p-3">
              <Text className="font-arial text-sm font-bold text-primary">
                Dica
              </Text>

              <Text className="mt-1 font-arial text-sm leading-5 text-text">
                Reveja a relação entre o conceito e sua definição antes de
                tentar novamente.
              </Text>
            </View>
          ) : null}

          <Pressable
            onPress={onClose}
            className="min-h-[48px] items-center justify-center rounded-lg bg-secondary px-5 py-3 active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Fechar feedback"
          >
            <Text className="font-arial text-base font-bold text-text">
              Continuar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
