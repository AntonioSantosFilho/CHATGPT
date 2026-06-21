import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PhetWebViewScreen(): JSX.Element {
  const { url, nome } = useLocalSearchParams<{
    url?: string;
    nome?: string;
  }>();

  const [hasError, setHasError] = useState<boolean>(false);

  const urlParam = Array.isArray(url) ? url[0] : url;
  const nomeParam = Array.isArray(nome) ? nome[0] : nome;

  if (!urlParam) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-center font-arial text-xl font-bold text-primary">
          URL da simulação não informada
        </Text>

        <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
          Volte e tente abrir a simulação novamente.
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="mt-5 rounded-lg bg-secondary px-5 py-3 active:opacity-80"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Text className="font-arial text-base font-bold text-text">
            Voltar
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <WebView
        source={{ uri: urlParam }}
        className="flex-1"
        startInLoadingState
        onError={() => setHasError(true)}
        renderLoading={() => (
          <View className="absolute inset-0 items-center justify-center bg-background">
            <ActivityIndicator size="large" color="#0289e0" />

            <Text className="mt-3 font-arial text-sm font-bold text-primary">
              Carregando simulação...
            </Text>
          </View>
        )}
      />

      <View className="absolute left-4 right-4 top-12">
        <View className="flex-row items-center gap-3 rounded-xl border border-border bg-primaryLight p-2">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-secondary active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text className="font-arial text-xl font-bold text-text">‹</Text>
          </Pressable>

          <Text
            className="flex-1 font-arial text-sm font-bold text-primary"
            numberOfLines={1}
          >
            {nomeParam ?? 'Simulação PhET'}
          </Text>
        </View>

        {hasError ? (
          <View className="mt-3 rounded-xl border border-error bg-errorLight p-3">
            <Text className="font-arial text-sm font-bold text-text">
              Não foi possível carregar a simulação.
            </Text>

            <Text className="mt-1 font-arial text-xs leading-4 text-textMuted">
              Verifique sua conexão ou tente abrir novamente.
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
