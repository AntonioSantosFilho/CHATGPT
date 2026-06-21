import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ConteudoCard } from '../../../components/ConteudoCard';
import { Header } from '../../../components/Header';
import { SimulacaoCard } from '../../../components/SimulacaoCard';
import { useConteudoTeorico } from '../../../hooks/useConteudoTeorico';
import type { NivelDificuldade } from '../../../types';

const gruposDificuldade: Array<{
  key: NivelDificuldade;
  titulo: string;
  descricao: string;
}> = [
  {
    key: 'facil',
    titulo: 'Fácil',
    descricao: 'Conceitos essenciais para iniciar o estudo.',
  },
  {
    key: 'medio',
    titulo: 'Médio',
    descricao: 'Aplicações, fórmulas e interpretação física.',
  },
  {
    key: 'dificil',
    titulo: 'Difícil',
    descricao: 'Problemas mais completos e raciocínio integrado.',
  },
];

export default function EstudarScreen(): JSX.Element {
  const { agrupadosPorDificuldade } = useConteudoTeorico();

  return (
    <View className="flex-1 bg-background">
      <Header title="Estudar" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            Conteúdo teórico
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
            Estude por nível de dificuldade.
          </Text>

          <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
            Consulte conceitos, fórmulas, variáveis e exercícios resolvidos para
            revisar rapidamente os principais tópicos de Física.
          </Text>
        </View>

        <View className="mb-6">
          <SimulacaoCard
            nome="Simulações PhET"
            tema="laboratório virtual"
            descricao="Explore simulações interativas de eletrostática, circuitos e eletromagnetismo."
            onPress={() => router.push('/estudar/phet')}
          />
        </View>

        {gruposDificuldade.map((grupo) => {
          const conteudos = agrupadosPorDificuldade[grupo.key];

          if (conteudos.length === 0) {
            return null;
          }

          return (
            <View key={grupo.key} className="mb-7">
              <View className="mb-3">
                <Text className="font-arial text-xl font-bold text-primary">
                  {grupo.titulo}
                </Text>

                <Text className="mt-1 font-arial text-sm text-textMuted">
                  {grupo.descricao}
                </Text>
              </View>

              <View className="gap-3">
                {conteudos.map((conteudo) => (
                  <ConteudoCard
                    key={conteudo.topico}
                    titulo={conteudo.topico}
                    conceito={conteudo.conceito}
                    dificuldade={conteudo.dificuldade ?? grupo.key}
                    onPress={() =>
                      router.push({
                        pathname: '/estudar/[modulo]',
                        params: {
                          modulo: conteudo.topico,
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
