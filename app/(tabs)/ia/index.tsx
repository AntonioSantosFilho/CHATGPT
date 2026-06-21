import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import { BotaoPrimario } from "../../../components/BotaoPrimario";
import { BubbleChat } from "../../../components/BubbleChat";
import { Header } from "../../../components/Header";
import { colors } from "../../../constants/Colors";
import { useChat } from "../../../hooks/useChat";

export default function IaScreen(): JSX.Element {
  const {
    mensagens,
    textoAtual,
    enviando,
    podeEnviar,
    setTextoAtual,
    enviarMensagem,
  } = useChat();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title="Ajuda IA" />

      <View className="flex-1 px-4 pt-4">
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 pb-4"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BubbleChat mensagem={item} />}
          ListFooterComponent={
            enviando ? (
              <Text className="mt-2 font-arial text-sm text-textMuted">
                digitando...
              </Text>
            ) : null
          }
        />
      </View>

      <View className="border-t border-border bg-card px-4 py-3">
        <TextInput
          value={textoAtual}
          onChangeText={setTextoAtual}
          placeholder="Digite sua dúvida de Física"
          placeholderTextColor={colors.textMuted}
          multiline
          className="max-h-32 min-h-[52px] rounded-xl border border-border bg-surface px-4 py-3 font-arial text-base text-text"
        />

        <View className="mt-3">
          <BotaoPrimario
            label={enviando ? "Enviando..." : "Enviar"}
            onPress={() => void enviarMensagem()}
            disabled={!podeEnviar}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
