import type { Href } from 'expo-router';

export const DESIGN_TOKENS = {
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#1D4ED8',
    primaryLight: '#DBEAFE',
    secondary: '#0F172A',
    text: '#020617',
    textMuted: '#64748B',
    border: '#E2E8F0',
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
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
    description: 'Leia explicações teóricas organizadas por temas.',
    icon: '📘',
    href: '/conteudos',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Revise conceitos importantes de forma rápida.',
    icon: '🧠',
    href: '/flashcards',
  },
  {
    id: 'questoes',
    title: 'Questões',
    description: 'Pratique com exercícios e justificativas.',
    icon: '✅',
    href: '/questoes',
  },
  {
    id: 'memoria',
    title: 'Memória',
    description: 'Associe conceitos e definições em formato de jogo.',
    icon: '🎮',
    href: '/memoria',
  },
  {
    id: 'simulacoes',
    title: 'Simulações',
    description: 'Explore fenômenos físicos com simulações PhET.',
    icon: '🧪',
    href: '/simulacoes',
  },
  {
    id: 'progresso',
    title: 'Progresso',
    description: 'Acompanhe seu desempenho e evolução nos estudos.',
    icon: '📈',
    href: '/progresso',
  },
  {
    id: 'ajuda-ia',
    title: 'Ajuda IA',
    description: 'Tire dúvidas e receba explicações guiadas.',
    icon: '🤖',
    href: '/ajuda-ia',
  },
  {
    id: 'estudar',
    title: 'Estudar',
    description: 'Veja todos os recursos de estudo em um só lugar.',
    icon: '📚',
    href: '/estudar',
  },
];

export const APP_INFO = {
  name: 'FisicAI',
  description: 'Aplicativo mobile de ensino de física com apoio de IA.',
  versionLabel: 'Fundação inicial',
} as const;
