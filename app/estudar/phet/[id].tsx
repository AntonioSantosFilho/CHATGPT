import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { BotaoPrimario } from '../../../components/BotaoPrimario';
import { Header } from '../../../components/Header';
import { buscarSimulacaoPorId } from '../../../hooks/useSimulacoes';

export default function PhetDetalheScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const idParam = Array.isArray(id) ? id[0] : id;
  const simulacao = idParam ? buscarSimulacaoPorId(idParam) : undefined;

  if (!simulacao) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Simulação" showBackButton />

        <View className="flex-1 justify-center px-6">
          <Text className="text-center font-arial text-xl font-bold text-primary">
            Simulação não encontrada
          </Text>

          <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
            Não foi possível localizar a simulação solicitada.
          </Text>
        </View>
      </View>
    );
  }

  function iniciarSimulacao(): void {
    if (!simulacao) {
      return;
    }

    router.push({
      pathname: '/estudar/phet/simulacao',
      params: {
        url: simulacao.url,
        nome: simulacao.nome,
      },
    });
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Detalhes" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-xl border border-border bg-card p-4">
          <View className="mb-3 self-start rounded-full bg-secondary px-3 py-1">
            <Text className="font-arial text-xs font-bold uppercase tracking-wide text-text">
              {simulacao.tema}
            </Text>
          </View>

          <Text className="font-arial text-2xl font-bold leading-8 text-primary">
            {simulacao.nome}
          </Text>

          <Text className="mt-3 font-arial text-base leading-6 text-textMuted">
            {simulacao.descricao}
          </Text>
        </View>

        <View className="rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-lg font-bold text-primary">
            Tópicos abordados
          </Text>

          <View className="mt-3 flex-row flex-wrap gap-2">
            {simulacao.topicos.map((topico) => (
              <View
                key={topico}
                className="rounded-full border border-primary bg-primaryLight px-3 py-2"
              >
                <Text className="font-arial text-xs font-bold text-primary">
                  {topico}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-xl border border-border bg-card p-4">
          <Text className="font-arial text-lg font-bold text-primary">
            Objetivos de aprendizagem
          </Text>

          <View className="mt-3 gap-3">
            {simulacao.objetivos.map((objetivo) => (
              <View key={objetivo} className="flex-row gap-3">
                <View className="mt-1.5 h-3 w-3 rounded-full bg-secondary" />
                <Text className="flex-1 font-arial text-sm leading-5 text-text">
                  {objetivo}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <BotaoPrimario label="Iniciar simulação" onPress={iniciarSimulacao} />
      </ScrollView>
    </View>
  );
}
