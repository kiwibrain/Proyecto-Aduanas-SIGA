import { useState } from "react";
import { useAccessibility } from "@/lib/accessibility";
import { X, RotateCcw, Check } from "lucide-react";

const AccessibilityIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
    <circle cx="12" cy="4.5" r="2" />
    <path d="M15.5 8.5H8.5C7.67 8.5 7 9.17 7 10v1.5c0 .83.67 1.5 1.5 1.5H9l1 5h4l1-5h.5c.83 0 1.5-.67 1.5-1.5V10c0-.83-.67-1.5-1.5-1.5z" />
    <path d="M7.5 10.5l-2 3.5M16.5 10.5l2 3.5" strokeWidth="1.5" fill="none" stroke="white" />
  </svg>
);

const ToggleRow = ({
  label,
  active,
  onToggle,
  description,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  description?: string;
}) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-800 leading-tight">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0032A0] ${
        active ? "bg-[#0032A0] border-[#0032A0]" : "bg-gray-200 border-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          active ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const {
    fontSize,
    highContrast,
    language,
    underlineLinks,
    reduceMotion,
    textSpacing,
    setFontSize,
    toggleHighContrast,
    setLanguage,
    toggleUnderlineLinks,
    toggleReduceMotion,
    toggleTextSpacing,
    reset,
  } = useAccessibility();

  const fontSizes = [
    { key: "normal" as const, label: "A", title: "Normal (100%)" },
    { key: "large" as const, label: "A", title: "Grande (115%)", cls: "text-base" },
    { key: "xlarge" as const, label: "A", title: "Muy grande (130%)", cls: "text-lg" },
  ];

  const isModified =
    fontSize !== "normal" ||
    highContrast ||
    language !== "es" ||
    underlineLinks ||
    reduceMotion ||
    textSpacing;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="w-72 rounded-2xl shadow-2xl border border-gray-100 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="dialog"
          aria-label="Menú de accesibilidad"
        >
          {/* Header */}
          <div className="bg-[#0032A0] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AccessibilityIcon />
              <div>
                <p className="font-bold text-sm leading-tight">Menú de Accesibilidad</p>
                <p className="text-blue-200 text-xs">WCAG 2.0 · SIGA</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="Cerrar menú de accesibilidad"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Font size */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tamaño de texto</p>
              <div className="flex gap-1.5">
                {fontSizes.map((f, i) => (
                  <button
                    key={f.key}
                    title={f.title}
                    onClick={() => setFontSize(f.key)}
                    className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                      fontSize === f.key
                        ? "bg-[#0032A0] text-white border-[#0032A0]"
                        : "border-gray-200 text-gray-600 hover:border-[#0032A0] hover:text-[#0032A0]"
                    } ${i === 0 ? "text-xs" : i === 1 ? "text-sm" : "text-base"}`}
                  >
                    {f.label}
                    {fontSize === f.key && (
                      <Check className="h-3 w-3 inline ml-1" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {fontSize === "normal" ? "100% — Normal" : fontSize === "large" ? "115% — Grande" : "130% — Muy grande"}
              </p>
            </div>

            <div className="border-t border-gray-100" />

            {/* Language */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Idioma / Language</p>
              <div className="flex gap-2">
                {(["es", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                      language === lang
                        ? "bg-[#0032A0] text-white border-[#0032A0]"
                        : "border-gray-200 text-gray-600 hover:border-[#0032A0] hover:text-[#0032A0]"
                    }`}
                  >
                    {lang === "es" ? "🇨🇱 Español" : "🇺🇸 English"}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Toggles */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Opciones visuales</p>
              <ToggleRow
                label="Alto contraste"
                description="Invierte colores para mayor contraste"
                active={highContrast}
                onToggle={toggleHighContrast}
              />
              <ToggleRow
                label="Subrayar enlaces"
                description="Hace los enlaces más visibles"
                active={underlineLinks}
                onToggle={toggleUnderlineLinks}
              />
              <ToggleRow
                label="Espaciado de texto"
                description="Mayor espacio entre letras y líneas"
                active={textSpacing}
                onToggle={toggleTextSpacing}
              />
              <ToggleRow
                label="Reducir movimiento"
                description="Desactiva animaciones y transiciones"
                active={reduceMotion}
                onToggle={toggleReduceMotion}
              />
            </div>

            {isModified && (
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restablecer configuración
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de accesibilidad"
        aria-expanded={open}
        title="Menú de Accesibilidad"
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0032A0]/40 hover:scale-110 active:scale-95 ${
          open
            ? "bg-[#00205B] shadow-xl scale-105"
            : isModified
            ? "bg-[#0032A0] ring-2 ring-white ring-offset-2"
            : "bg-[#0032A0]"
        }`}
      >
        <AccessibilityIcon />
        {isModified && !open && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  );
}
