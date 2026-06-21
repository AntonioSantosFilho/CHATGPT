import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Header } from '../../../components/Header';
import { SimulacaoCard } from '../../../components/SimulacaoCard';
import { useSimulacoes, type TemaSimulacao } from '../../../hooks/useSimulacoes';

const temaLabels: Record<TemaSimulacao, string> = {
  eletromagnetismo: 'Eletromagnetismo',
  eletrostatica: 'Eletrostática',
  circuitos: 'Circuitos',
};

export default function PhetSimulacoesScreen(): JSX.Element {
  const { agrupadasPorTema } = useSimulacoes();

  return (
    <View className="flex-1 bg-background">
      <Header title="Simulações PhET" showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Laboratório virtual
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
            Explore a Física em simulações interativas.
          </Text>

          <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
            Escolha uma simulação para visualizar os tópicos, objetivos de
            aprendizagem e iniciar a experiência embarcada no app.
          </Text>
        </View>

        {(Object.keys(agrupadasPorTema) as TemaSimulacao[]).map((tema) => {
          const simulacoes = agrupadasPorTema[tema];

          if (simulacoes.length === 0) {
            return null;
          }

          return (
            <View key={tema} className="mb-7">
              <Text className="mb-3 font-arial text-xl font-bold text-primary">
                {temaLabels[tema]}
              </Text>

              <View className="gap-3">
                {simulacoes.map((simulacao) => (
                  <SimulacaoCard
                    key={simulacao.id}
                    nome={simulacao.nome}
                    tema={temaLabels[simulacao.tema]}
                    descricao={simulacao.descricao}
                    onPress={() =>
                      router.push({
                        pathname: '/estudar/phet/[id]',
                        params: {
                          id: simulacao.id,
                        },
                      })
                    }
                  />
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
