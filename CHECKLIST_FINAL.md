# CHECKLIST FINAL — FisicAI

## Navegação

- A barra inferior exibe apenas: Home, Estudar, Progresso e Ajuda IA.
- Rotas internas de jogos, detalhes, simulações e conteúdos ficam fora de `app/(tabs)`.
- Nenhuma rota interna foi registrada em Tabs com `href: null`.

## Rastreabilidade dos requisitos funcionais

| Requisito                                           | Implementação                                                                                           | Prompt           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------- |
| RF01 — Flashcards, quiz, desafio, memória e lacunas | `app/jogos/flashcards`, `app/jogos/quiz`, `app/jogos/desafio`, `app/jogos/memoria`, `app/jogos/lacunas` | Prompts 4 e 5    |
| RF02 — Sequência definida pelo sistema              | Hooks `useFlashcardSession`, `useMemoriaGame`, `useQuizSession`, `useLacunasSession`                    | Prompts 4 e 5    |
| RF03 — Questões de conceito, cálculo e aplicação    | `data/questoes.json` consumido por `useQuizSession`                                                     | Prompt 5         |
| RF04 — 3 a 5 temas distintos                        | Estrutura modular em `data/questoes.json` e `app/jogos/quiz/index.tsx`                                  | Prompt 5         |
| RF05 — Feedback imediato                            | `FeedbackModal.tsx`, sessões de quiz, desafio, memória e lacunas                                        | Prompts 4 e 5    |
| RF06 — Registro de acertos e tempo                  | `services/progressoService.ts` consolidado                                                              | Prompts 4, 5 e 6 |
| RF07 — Agrupamento por dificuldade                  | `BadgeDificuldade`, filtros dos hooks e telas de seleção                                                | Prompts 3, 4 e 5 |
| RF08 — Suporte a fórmulas                           | `FormulaBox.tsx`, `ExercicioResolvido.tsx`, lacunas com fórmulas                                        | Prompts 3 e 5    |
| RF09 — Lista de progresso local                     | `app/(tabs)/progresso/index.tsx`, `ProgressoCard.tsx`, `GraficoAcertos.tsx`                             | Prompt 6         |
| RF10 — Conteúdo teórico e fórmulas                  | `app/estudar/[modulo].tsx`, `useConteudoTeorico.ts`                                                     | Prompt 3         |
| RF11 — Simulador PhET via WebView                   | `app/estudar/phet/simulacao.tsx`                                                                        | Prompt 3         |
| RF12 — IA conversacional                            | `app/(tabs)/ia/index.tsx`, `useChat.ts`, `services/iaService.ts`                                        | Prompt 6         |

## Rastreabilidade dos requisitos não funcionais

| Requisito                      | Implementação                                         | Prompt           |
| ------------------------------ | ----------------------------------------------------- | ---------------- |
| RNF01 — Home com grid completo | `app/(tabs)/index.tsx` final                          | Prompts 1, 2 e 6 |
| RNF02 — Botão reiniciar        | `BotaoReiniciar.tsx` e telas de jogos                 | Prompts 4 e 5    |
| RNF03 — Botão de ajuda         | `HelpButton.tsx`                                      | Prompt 1         |
| RNF04 — Dicas extras em erros  | `FeedbackModal.tsx`, quiz, desafio, memória e lacunas | Prompts 4 e 5    |

## Serviços finais

- `services/progressoService.ts`: versão consolidada final para todas as sessões.
- `services/iaService.ts`: chamada Gemini com `EXPO_PUBLIC_GEMINI_API_KEY` e `EXPO_PUBLIC_GEMINI_MODEL`.

## Variáveis de ambiente

```env
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave
EXPO_PUBLIC_GEMINI_MODEL=gemini-2.5-flash-lite
```

Se `EXPO_PUBLIC_GEMINI_MODEL` não for definida, o app usa `gemini-2.0-flash-lite`.

## Observações finais

- Não foram recriados `package.json`, `tsconfig.json`, `tailwind.config.js` ou `babel.config.js`.
- Componentes base dos prompts anteriores foram reaproveitados.
- O histórico do chat da IA fica somente em memória durante a sessão.
- A persistência de desempenho usa uma única chave: `@fisicai:progresso-sessoes`.
