export const colors = {
  primary: '#0289e0',
  primaryDark: '#0268aa',
  primaryLight: '#e0f2fe',
  secondary: '#f9ac03',
  secondaryDarkText: '#1a1a1a',
  success: '#22c55e',
  successSurface: '#dcfce7',
  warning: '#f9ac03',
  warningSurface: '#fef3c7',
  error: '#ef4444',
  errorSurface: '#fee2e2',
  background: '#f8fafc',
  surface: '#ffffff',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  textSoft: '#9ca3af',
  textOnPrimary: '#1a1a1a',
  textOnSecondary: '#1a1a1a',
  overlay: 'rgba(26, 26, 26, 0.45)',
} as const;

export type ColorToken = keyof typeof colors;

const Colors = {
  light: {
    text: colors.text,
    background: colors.background,
    tint: colors.primary,
    tabIconDefault: colors.textMuted,
    tabIconSelected: colors.primary,
  },
  dark: {
    text: '#ffffff',
    background: '#1a1a1a',
    tint: colors.primary,
    tabIconDefault: colors.textMuted,
    tabIconSelected: colors.primary,
  },
};

export default Colors;
