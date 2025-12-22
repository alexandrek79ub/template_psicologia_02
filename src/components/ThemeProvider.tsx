import { useEffect, createContext, useContext, ReactNode } from 'react';
import universalData from '@/data/universal.json';

// Interface para as configurações de tema do universal.json
interface ThemeConfig {
  corPrimaria: string;
  corSecundaria: string;
  corFundo: string;
  corTexto: string;
  modoEscuro: boolean;
  paletaId?: string;
}

interface ThemeContextType {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Converte cor HEX para formato HSL (sem "hsl()" wrapper)
 * Retorna string no formato "H S% L%" para uso com CSS variables do Tailwind
 */
function hexToHSL(hex: string): string {
  // Remove o # se presente
  hex = hex.replace(/^#/, '');

  // Converte para RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Retorna no formato "H S% L%" para CSS variables
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Calcula uma cor de foreground contrastante baseada na luminosidade
 */
function getContrastForeground(hex: string): string {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calcula luminância relativa
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retorna preto ou branco baseado na luminância
  return luminance > 0.5 ? '0 0% 10%' : '0 0% 98%';
}

/**
 * Gera variações de cor (mais clara/escura) para estados de UI
 */
function generateColorVariations(hex: string) {
  const hsl = hexToHSL(hex);
  const parts = hsl.split(' ');
  const h = parseInt(parts[0]);
  const s = parseInt(parts[1]);
  const l = parseInt(parts[2]);

  return {
    base: hsl,
    lighter: `${h} ${Math.min(s + 10, 100)}% ${Math.min(l + 15, 95)}%`,
    darker: `${h} ${s}% ${Math.max(l - 15, 5)}%`,
    muted: `${h} ${Math.max(s - 30, 10)}% ${Math.min(l + 20, 90)}%`,
  };
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Obtém as configurações do tema do universal.json
  const themeConfig: ThemeConfig = (universalData as any).configuracoes?.tema || {
    corPrimaria: '#e3c9c9',
    corSecundaria: '#f5e5e5',
    corFundo: '#f7f4ee',
    corTexto: '#1a1a1a',
    modoEscuro: false,
  };

  useEffect(() => {
    const root = document.documentElement;

    // Converte as cores HEX para HSL
    const primaryHSL = hexToHSL(themeConfig.corPrimaria);
    const secondaryHSL = hexToHSL(themeConfig.corSecundaria);
    const backgroundHSL = hexToHSL(themeConfig.corFundo);
    const foregroundHSL = hexToHSL(themeConfig.corTexto);

    // Gera variações de cores
    const primaryVariations = generateColorVariations(themeConfig.corPrimaria);
    const secondaryVariations = generateColorVariations(themeConfig.corSecundaria);

    // Calcula cores de foreground contrastantes
    const primaryForeground = getContrastForeground(themeConfig.corPrimaria);
    const secondaryForeground = getContrastForeground(themeConfig.corSecundaria);

    // Aplica as CSS variables principais
    root.style.setProperty('--primary', primaryHSL);
    root.style.setProperty('--primary-foreground', primaryForeground);

    root.style.setProperty('--secondary', secondaryHSL);
    root.style.setProperty('--secondary-foreground', secondaryForeground);

    root.style.setProperty('--background', backgroundHSL);
    root.style.setProperty('--foreground', foregroundHSL);

    // Aplica cores derivadas para UI consistente
    root.style.setProperty('--card', backgroundHSL);
    root.style.setProperty('--card-foreground', foregroundHSL);

    root.style.setProperty('--popover', backgroundHSL);
    root.style.setProperty('--popover-foreground', foregroundHSL);

    // Cores de accent baseadas na secundária
    root.style.setProperty('--accent', secondaryVariations.lighter);
    root.style.setProperty('--accent-foreground', foregroundHSL);

    // Cores muted baseadas na primária
    root.style.setProperty('--muted', primaryVariations.muted);
    // Calcula muted-foreground com base na luminosidade do fundo
    // Se o fundo for escuro, muted-foreground deve ser um cinza claro
    // Se o fundo for claro, muted-foreground deve ser um cinza escuro
    const bgLightness = parseInt(backgroundHSL.split(' ')[2]); // Extrai L% do HSL
    const mutedForegroundLightness = bgLightness < 50 ? '65%' : '40%'; // Claro para fundo escuro, escuro para fundo claro
    root.style.setProperty('--muted-foreground', `0 0% ${mutedForegroundLightness}`);

    // Border e input baseados na secundária
    root.style.setProperty('--border', secondaryHSL);
    root.style.setProperty('--input', primaryVariations.muted);
    root.style.setProperty('--ring', primaryHSL);

    // Sidebar colors
    root.style.setProperty('--sidebar-background', backgroundHSL);
    root.style.setProperty('--sidebar-foreground', foregroundHSL);
    root.style.setProperty('--sidebar-primary', primaryHSL);
    root.style.setProperty('--sidebar-primary-foreground', primaryForeground);
    root.style.setProperty('--sidebar-accent', secondaryHSL);
    root.style.setProperty('--sidebar-accent-foreground', secondaryForeground);
    root.style.setProperty('--sidebar-border', secondaryHSL);
    root.style.setProperty('--sidebar-ring', primaryHSL);

    // Cores temáticas especiais (para gradientes e efeitos)
    root.style.setProperty('--rose-gold', primaryHSL);
    root.style.setProperty('--rose-delicate', secondaryHSL);
    root.style.setProperty('--champagne-soft', secondaryVariations.lighter);
    root.style.setProperty('--beige-calm', backgroundHSL);

    // Cores específicas para elementos glass (sempre com contraste em fundo branco/transparente)
    // Glass sempre tem fundo claro, então o texto precisa ser escuro para contraste
    root.style.setProperty('--glass-foreground', '0 0% 10%'); // Preto suave para títulos
    root.style.setProperty('--glass-muted-foreground', '0 0% 35%'); // Cinza escuro para subtextos
    root.style.setProperty('--glass-primary', primaryHSL); // Cor primária para destaques

    // Aplica modo escuro se configurado
    if (themeConfig.modoEscuro) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    console.log('🎨 Theme applied from universal.json:', {
      paletaId: themeConfig.paletaId,
      primary: themeConfig.corPrimaria,
      secondary: themeConfig.corSecundaria,
      background: themeConfig.corFundo,
      text: themeConfig.corTexto,
    });

  }, [themeConfig]);

  const contextValue: ThemeContextType = {
    theme: themeConfig,
    isDarkMode: themeConfig.modoEscuro,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para acessar as configurações do tema
 */
export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
