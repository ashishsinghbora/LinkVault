import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode, AccentColor, BackgroundStyle } from '../types/profile';

export function useTheme(
  initialDefaultTheme: ThemeMode = 'dark',
  initialAccent: AccentColor = 'mint',
  initialBackground: BackgroundStyle = 'technical-grid'
) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return initialDefaultTheme;
    const saved = localStorage.getItem('linkvault_theme_mode') as ThemeMode;
    return saved || initialDefaultTheme;
  });

  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window === 'undefined') return initialAccent;
    const saved = localStorage.getItem('linkvault_accent') as AccentColor;
    return saved || initialAccent;
  });

  const [background, setBackground] = useState<BackgroundStyle>(() => {
    if (typeof window === 'undefined') return initialBackground;
    const saved = localStorage.getItem('linkvault_background') as BackgroundStyle;
    return saved || initialBackground;
  });

  // Calculate effective dark/light state
  const isDark = useCallback(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themeMode === 'dark';
  }, [themeMode]);

  // Apply theme class and data attributes
  useEffect(() => {
    const root = document.documentElement;
    const dark = isDark();

    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-background', background);

    localStorage.setItem('linkvault_theme_mode', themeMode);
    localStorage.setItem('linkvault_accent', accent);
    localStorage.setItem('linkvault_background', background);
  }, [themeMode, accent, background, isDark]);

  // Listen to system changes if themeMode is system
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'system';
      return 'dark';
    });
  };

  return {
    themeMode,
    setThemeMode,
    toggleTheme,
    accent,
    setAccent,
    background,
    setBackground,
    isDark: isDark(),
  };
}
