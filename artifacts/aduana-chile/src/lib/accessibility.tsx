import { createContext, useContext, useState, useEffect } from "react";

export type FontSize = "normal" | "large" | "xlarge";
export type Language = "es" | "en";

export interface A11yState {
  fontSize: FontSize;
  highContrast: boolean;
  language: Language;
  underlineLinks: boolean;
  reduceMotion: boolean;
  textSpacing: boolean;
}

interface A11yContextValue extends A11yState {
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  setLanguage: (lang: Language) => void;
  toggleUnderlineLinks: () => void;
  toggleReduceMotion: () => void;
  toggleTextSpacing: () => void;
  reset: () => void;
}

const DEFAULTS: A11yState = {
  fontSize: "normal",
  highContrast: false,
  language: "es",
  underlineLinks: false,
  reduceMotion: false,
  textSpacing: false,
};

const A11yContext = createContext<A11yContextValue>({
  ...DEFAULTS,
  setFontSize: () => {},
  toggleHighContrast: () => {},
  setLanguage: () => {},
  toggleUnderlineLinks: () => {},
  toggleReduceMotion: () => {},
  toggleTextSpacing: () => {},
  reset: () => {},
});

function loadSaved(): A11yState {
  try {
    const raw = localStorage.getItem("siga_a11y");
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<A11yState>(loadSaved);

  const update = (partial: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      try { localStorage.setItem("siga_a11y", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("a11y-text-large", state.fontSize === "large");
    el.classList.toggle("a11y-text-xlarge", state.fontSize === "xlarge");
    el.classList.toggle("a11y-high-contrast", state.highContrast);
    el.classList.toggle("a11y-underline-links", state.underlineLinks);
    el.classList.toggle("a11y-reduce-motion", state.reduceMotion);
    el.classList.toggle("a11y-text-spacing", state.textSpacing);
    el.setAttribute("lang", state.language);
  }, [state]);

  return (
    <A11yContext.Provider value={{
      ...state,
      setFontSize: (fontSize) => update({ fontSize }),
      toggleHighContrast: () => update({ highContrast: !state.highContrast }),
      setLanguage: (language) => update({ language }),
      toggleUnderlineLinks: () => update({ underlineLinks: !state.underlineLinks }),
      toggleReduceMotion: () => update({ reduceMotion: !state.reduceMotion }),
      toggleTextSpacing: () => update({ textSpacing: !state.textSpacing }),
      reset: () => update(DEFAULTS),
    }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(A11yContext);
}

export const T: Record<Language, Record<string, string>> = {
  es: {
    home: "Inicio",
    login: "Iniciar Sesión",
    register: "Registrarse",
    logout: "Cerrar Sesión",
    secure: "Conexión segura TLS 1.3",
    operating: "Sistema operativo 24/7",
    ministry: "Ministerio de Hacienda — República de Chile",
    customs: "Servicio Nacional de Aduanas",
    terms: "Términos de uso",
    privacy: "Privacidad",
    accessibility: "Accesibilidad",
    gov: "© 2025 Gobierno de Chile",
    available: "Disponible 24/7",
    traveler: "Viajero",
  },
  en: {
    home: "Home",
    login: "Sign In",
    register: "Sign Up",
    logout: "Sign Out",
    secure: "Secure connection TLS 1.3",
    operating: "System running 24/7",
    ministry: "Ministry of Finance — Republic of Chile",
    customs: "National Customs Service",
    terms: "Terms of use",
    privacy: "Privacy",
    accessibility: "Accessibility",
    gov: "© 2025 Government of Chile",
    available: "Available 24/7",
    traveler: "Traveler",
  },
};
