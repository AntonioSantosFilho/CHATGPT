import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { BadgeDificuldade } from '../../components/BadgeDificuldade';
import { ExercicioResolvido } from '../../components/ExercicioResolvido';
import { FormulaBox } from '../../components/FormulaBox';
import { Header } from '../../components/Header';
import { buscarConteudoPorTopico } from '../../hooks/useConteudoTeorico';

export default function ConteudoTeoricoDetalheScreen(): JSX.Element {
  const { modulo } = useLocalSearchParams<{ modulo?: string }>();

  const moduloParam = Array.isArray(modulo) ? modulo[0] : modulo;
  const conteudo = moduloParam ? buscarConteudoPorTopico(moduloParam) : undefined;

  if (!conteudo) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Conteúdo" showBackButton />

        <View className="flex-1 justify-center px-6">
          <Text className="text-center font-arial text-xl font-bold text-primary">
            Conteúdo não encontrado
          </Text>

          <Text className="mt-2 text-center font-arial text-sm leading-5 text-textMuted">
            Não foi possível localizar o tópico solicitado.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title={conteudo.topico} showBackButton />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-xl border border-border bg-card p-4">
          <View className="mb-3 flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
                {conteudo.tema}
              </Text>

              <Text className="mt-2 font-arial text-2xl font-bold leading-8 text-text">
                {conteudo.topico}
              </Text>
            </View>

            <BadgeDificuldade dificuldade={conteudo.dificuldade ?? 'facil'} />
          </View>

          <Text className="font-arial text-base leading-6 text-textMuted">
            {conteudo.conceito}
          </Text>
        </View>

        <FormulaBox
          formulaLegivel={conteudo.formula_legivel}
          formulaLatex={conteudo.formula_latex}
          notaPedagogica={conteudo.nota_pedagogica}
        />

        <View className="rounded-xl border border-border bg-card p-4">
          <Text className="font-arial text-lg font-bold text-primary">
            Variáveis da fórmula
          </Text>

          <View className="mt-3 gap-3">
            {conteudo.variaveis.map((variavel) => (
              <View
                key={`${variavel.simbolo}-${variavel.significado}`}
                className="rounded-lg bg-primaryLight p-3"
              >
                <Text className="font-arial text-base font-bold text-primary">
                  {variavel.simbolo}
                </Text>

                <Text className="mt-1 font-arial text-sm leading-5 text-text">
                  {variavel.significado}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <ExercicioResolvido
          enunciado={conteudo.exercicio_resolvido.enunciado}
          passoAPasso={conteudo.exercicio_resolvido.passo_a_passo}
          resolucaoLegivel={conteudo.exercicio_resolvido.resolucao_legivel}
          resolucaoLatex={conteudo.exercicio_resolvido.resolucao_latex}
          respostaFinal={conteudo.exercicio_resolvido.resposta_final}
        />

        <View className="rounded-xl border border-border bg-surface p-4">
          <Text className="font-arial text-sm font-bold text-primary">
            Fonte
          </Text>

          <Text className="mt-1 font-arial text-sm leading-5 text-textMuted">
            {conteudo.fonte}
          </Text>

          <Text className="mt-3 font-arial text-xs leading-5 text-textMuted">
            Fonte externa necessária:{' '}
            {conteudo.fonte_externa_necessaria ? 'sim' : 'não'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
