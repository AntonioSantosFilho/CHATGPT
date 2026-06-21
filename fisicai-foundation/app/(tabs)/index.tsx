import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { HelpButton } from '../../components/HelpButton';
import { HOME_QUICK_ACCESS } from '../../constants';

export default function HomeScreen(): JSX.Element {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerClassName="px-5 pb-8 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8 flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            FisicAI
          </Text>

          <Text className="mt-2 text-3xl font-extrabold leading-9 text-slate-950">
            Aprenda Física de forma prática
          </Text>

          <Text className="mt-3 text-base leading-6 text-slate-600">
            Acesse conteúdos, flashcards, questões, jogos, simulações e suporte
            com IA em poucos toques.
          </Text>
        </View>

        <HelpButton />
      </View>

      <View className="mb-6 rounded-3xl bg-blue-700 p-5 shadow-sm">
        <Text className="text-sm font-semibold uppercase tracking-widest text-blue-100">
          Comece agora
        </Text>

        <Text className="mt-2 text-2xl font-bold text-white">
          Escolha um módulo e avance no seu ritmo.
        </Text>

        <Text className="mt-3 text-sm leading-5 text-blue-100">
          O grid abaixo reúne os principais recursos do app para estudo,
          revisão, prática e acompanhamento.
        </Text>
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-slate-950">
          Acesso rápido
        </Text>

        <Text className="text-sm font-medium text-slate-500">
          {HOME_QUICK_ACCESS.length} módulos
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        {HOME_QUICK_ACCESS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.href)}
            className="w-[48%] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm active:scale-95"
            accessibilityRole="button"
            accessibilityLabel={`Acessar ${item.title}`}
            accessibilityHint={item.description}
          >
            <View className="mb-4 h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Text className="text-2xl">{item.icon}</Text>
            </View>

            <Text className="text-base font-bold text-slate-950">
              {item.title}
            </Text>

            <Text className="mt-2 text-sm leading-5 text-slate-600">
              {item.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
