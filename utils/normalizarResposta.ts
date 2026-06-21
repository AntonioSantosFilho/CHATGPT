export function normalizarResposta(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function compararRespostaDigitada(
  respostaDigitada: string,
  respostasAceitas: string[],
): boolean {
  const normalizada = normalizarResposta(respostaDigitada);

  return respostasAceitas.some(
    (resposta) => normalizarResposta(resposta) === normalizada,
  );
}
