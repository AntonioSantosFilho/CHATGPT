import { Text, View } from 'react-native';

type FormulaBoxProps = {
  formulaLegivel: string;
  formulaLatex?: string;
  notaPedagogica?: string;
};

export function FormulaBox({
  formulaLegivel,
  formulaLatex,
  notaPedagogica,
}: FormulaBoxProps): JSX.Element {
  return (
    <View className="rounded-xl border border-primary bg-primaryLight p-4">
      <Text className="font-arial text-sm font-bold uppercase tracking-widest text-primary">
        Fórmula
      </Text>

      <View className="mt-3 rounded-lg bg-secondary px-4 py-3">
        <Text className="font-arial text-xl font-bold text-text">
          {formulaLegivel}
        </Text>
      </View>

      {formulaLatex ? (
        <View className="mt-3 rounded-lg border border-border bg-card p-3">
          <Text className="font-arial text-xs font-bold uppercase tracking-widest text-textMuted">
            LaTeX
          </Text>

          <Text className="mt-1 font-arial text-sm leading-5 text-text">
            {formulaLatex}
          </Text>
        </View>
      ) : null}

      {notaPedagogica ? (
        <Text className="mt-3 font-arial text-sm leading-5 text-textMuted">
          {notaPedagogica}
        </Text>
      ) : null}
    </View>
  );
}
