export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];

  for (let index = copia.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const itemAtual = copia[index];

    copia[index] = copia[randomIndex];
    copia[randomIndex] = itemAtual;
  }

  return copia;
}
