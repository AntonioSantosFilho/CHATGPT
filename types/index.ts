export type NivelDificuldade = 'facil' | 'medio' | 'dificil';

export type AreaFisica =
  | 'mecanica'
  | 'termologia'
  | 'ondulatoria'
  | 'optica'
  | 'eletricidade'
  | 'magnetismo'
  | 'fisica-moderna'
  | 'geral';

export type TipoQuestao = 'multipla-escolha' | 'verdadeiro-falso';

export type AutorMensagem = 'usuario' | 'ia' | 'sistema';

export type StatusProgresso = 'nao-iniciado' | 'em-andamento' | 'concluido';

export interface Flashcard {
  id: string;
  moduloId: string;
  area: AreaFisica;
  pergunta: string;
  resposta: string;
  explicacao?: string;
  dificuldade: NivelDificuldade;
  tags: string[];
  revisadoEm?: string;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface Questao {
  id: string;
  moduloId: string;
  area: AreaFisica;
  enunciado: string;
  tipo: TipoQuestao;
  alternativas: string[];
  alternativaCorreta: number;
  justificativa: string;
  explicacaoAlternativas?: string[];
  dificuldade: NivelDificuldade;
  tags: string[];
  fonte?: string;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface ParMemoria {
  id: string;
  moduloId: string;
  area: AreaFisica;
  termo: string;
  definicao: string;
  dificuldade: NivelDificuldade;
  tags: string[];
  criadoEm: string;
  atualizadoEm?: string;
}

export interface ConteudoTeorico {
  id: string;
  moduloId: string;
  area: AreaFisica;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  corpo: string;
  formulas?: string[];
  exemplos?: string[];
  palavrasChave: string[];
  ordem: number;
  tempoEstimadoMinutos: number;
  dificuldade: NivelDificuldade;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface ProgressoAluno {
  id: string;
  alunoId?: string;
  moduloId: string;
  status: StatusProgresso;
  percentualConclusao: number;
  conteudosConcluidos: string[];
  flashcardsRevisados: string[];
  questoesRespondidas: string[];
  questoesCorretas: string[];
  simulacoesAcessadas: string[];
  jogosMemoriaConcluidos: string[];
  tempoTotalEstudoMinutos: number;
  sequenciaDias: number;
  ultimoAcessoEm?: string;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface MensagemIA {
  id: string;
  conversaId: string;
  autor: AutorMensagem;
  texto: string;
  contextoModuloId?: string;
  contextoConteudoId?: string;
  criadoEm: string;
  tokensEstimados?: number;
  feedback?: 'util' | 'nao-util';
}

export interface SimulacaoPhET {
  id: string;
  moduloId: string;
  area: AreaFisica;
  titulo: string;
  descricao: string;
  url: string;
  imagemUrl?: string;
  objetivosAprendizagem: string[];
  instrucoesUso: string[];
  dificuldade: NivelDificuldade;
  tags: string[];
  tempoEstimadoMinutos: number;
  criadoEm: string;
  atualizadoEm?: string;
}
