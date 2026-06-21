/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0289e0',
        primaryLight: '#e0f2fe',

        secondary: '#f9ac03',
        secondaryLight: '#fff7d6',

        success: '#22c55e',
        successLight: '#dcfce7',

        error: '#ef4444',
        errorLight: '#fee2e2',

        warning: '#f9ac03',
        warningLight: '#fff7d6',

        background: '#f8fafc',
        surface: '#f3faff',
        card: '#ffffff',

        text: '#1a1a1a',
        textMuted: '#4b5563',
        textSoft: '#64748b',

        border: '#e5e7eb',
        borderStrong: '#0289e0',

        disabledBackground: '#e0f2fe',
        disabledText: '#0289e0',
      },
      fontFamily: {
        arial: ['Arial'],
      },
      spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        6: 24,
        8: 32,
        12: 48,
      },
      borderRadius: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        full: 999,
      },
    },
  },
  plugins: [],
};
