import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import { ModuloCard } from '../../components/ModuloCard';

const modulosHome = [
  {
    id: 'estudar',
    title: 'Estudar',
    description: 'Conteúdos teóricos, fórmulas e simulações PhET.',
    icon: '📚',
    href: '/estudar',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Revise conceitos com cartas de frente e verso.',
    icon: '🧠',
    href: '/jogos/flashcards',
  },
  {
    id: 'memoria',
    title: 'Memória',
    description: 'Associe conceitos, fórmulas e definições.',
    icon: '🎮',
    href: '/jogos/memoria',
  },
  {
    id: 'quiz',
    title: 'Quiz',
    description: 'Responda questões de múltipla escolha.',
    icon: '✅',
    href: '/jogos/quiz',
  },
  {
    id: 'desafio',
    title: 'Desafio',
    description: 'Resolva uma sequência sem voltar.',
    icon: '⚡',
    href: '/jogos/quiz',
  },
  {
    id: 'lacunas',
    title: 'Lacunas',
    description: 'Complete sentenças e fórmulas importantes.',
    icon: '✍️',
    href: '/jogos/quiz',
  },
  {
    id: 'progresso',
    title: 'Progresso',
    description: 'Veja acertos, tempo e histórico de sessões.',
    icon: '📈',
    href: '/progresso',
  },
  {
    id: 'ia',
    title: 'Ajuda IA',
    description: 'Tire dúvidas de Física em linguagem natural.',
    icon: '🤖',
    href: '/ia',
  },
];

export default function HomeScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-background">
      <Header title="FisicAI" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
            UNIVASF
          </Text>

          <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
            Física com prática, acompanhamento e ajuda inteligente.
          </Text>

          <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
            Escolha uma seção para estudar, revisar, jogar, simular fenômenos ou
            acompanhar seu desempenho.
          </Text>

          <View className="mt-4 self-start rounded-full bg-secondary px-4 py-2">
            <Text className="font-arial text-xs font-bold uppercase tracking-wide text-text">
              Grid completo
            </Text>
          </View>
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-arial text-xl font-bold text-primary">
            Módulos do app
          </Text>

          <View className="rounded-full bg-secondary px-3 py-1">
            <Text className="font-arial text-xs font-bold text-text">
              {modulosHome.length} acessos
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-4">
          {modulosHome.map((item) => (
            <ModuloCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onPress={() => router.push(item.href)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
