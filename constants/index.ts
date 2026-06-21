import type { Href } from 'expo-router';

import { colors } from './Colors';
import { spacing } from './spacing';
import { typography } from './typography';

export { colors } from './Colors';
export { spacing } from './spacing';
export { typography } from './typography';

export const DESIGN_TOKENS = {
  colors,
  spacing,
  typography,
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 999,
  },
} as const;

export type HomeQuickAccessItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: Href;
};

export const HOME_QUICK_ACCESS: HomeQuickAccessItem[] = [
  {
    id: 'conteudos',
    title: 'Conteúdos',
    description: 'Teoria organizada por temas da Física.',
    icon: '📘',
    href: '/conteudos',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Revise conceitos com cartões rápidos.',
    icon: '🧠',
    href: '/flashcards',
  },
  {
    id: 'questoes',
    title: 'Questões',
    description: 'Pratique com exercícios comentados.',
    icon: '✅',
    href: '/questoes',
  },
  {
    id: 'memoria',
    title: 'Memória',
    description: 'Associe conceitos e definições.',
    icon: '🎮',
    href: '/memoria',
  },
  {
    id: 'simulacoes',
    title: 'Simulações',
    description: 'Explore fenômenos com recursos PhET.',
    icon: '🧪',
    href: '/simulacoes',
  },
  {
    id: 'progresso',
    title: 'Progresso',
    description: 'Acompanhe sua evolução no estudo.',
    icon: '📈',
    href: '/progresso',
  },
  {
    id: 'ajuda-ia',
    title: 'Ajuda IA',
    description: 'Tire dúvidas com apoio inteligente.',
    icon: '🤖',
    href: '/ajuda-ia',
  },
  {
    id: 'estudar',
    title: 'Estudar',
    description: 'Veja todos os recursos em um só lugar.',
    icon: '📚',
    href: '/estudar',
  },
];

export const APP_INFO = {
  name: 'FisicAI',
  institution: 'Universidade Federal do Vale do São Francisco',
  shortInstitution: 'UNIVASF',
  description: 'Aplicativo mobile de ensino de Física com apoio de IA.',
  versionLabel: 'Design system UNIVASF',
} as const;
