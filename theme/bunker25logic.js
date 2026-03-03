export const darkColors = {
  base: '#1A0B2E',
  surface: '#120824',
  surface2: '#0E061D',
  accent: '#39FF14',
  support: '#2E5BFF',
  text: '#EAF2FF',
  muted: '#A7B0D6',
  border: 'rgba(57, 255, 20, 0.35)',
  borderStrong: 'rgba(57, 255, 20, 0.65)',
  overlay: 'rgba(0,0,0,0.72)',
};

export const lightColors = {
  base: '#F5F7FA',
  surface: '#FFFFFF',
  surface2: '#E4EBFA',
  accent: '#21C40D',
  support: '#2E5BFF',
  text: '#1A0B2E',
  muted: '#6B7280',
  border: 'rgba(33, 196, 13, 0.35)',
  borderStrong: 'rgba(33, 196, 13, 0.65)',
  overlay: 'rgba(0,0,0,0.4)',
};

export const getColors = (themeMode) => {
  return themeMode === 'light' ? lightColors : darkColors;
};

// BUNKER.colors always points to the dark (default) palette so that
// static StyleSheet.create blocks (which run at module load time, before
// any theme context is available) have a valid colour object.
export const BUNKER = {
  colors: darkColors,
  fonts: {
    title: 'Orbitron_700Bold',
    body: 'Oxanium_400Regular',
    bodyStrong: 'Oxanium_600SemiBold',
  },
  radius: {
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999,
  },
};
