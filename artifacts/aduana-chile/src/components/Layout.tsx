import { Link, useLocation } from "wouter";
import { GovernmentLogo } from "./GovernmentLogo";
import { useAuth } from "@/lib/auth";
import { LogOut, User } from "lucide-react";

export function Layout({ children, fullWidth = false }: { children: React.ReactNode; fullWidth?: boolean }) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const rolLabel: Record<string, string> = {
    viajero: "Viajero",
    aduana: "Aduana",
    pdi: "PDI",
    sag: "SAG",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[#0032A0] text-white px-4 py-2 rounded z-50 font-medium">
        Saltar al contenido principal
      </a>
      <header role="banner" className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <GovernmentLogo />
          </Link>
          <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#0032A0] transition-colors">Inicio</Link>
            {user ? (
              <>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0032A0] rounded-md font-semibold text-sm">
                  <User className="h-4 w-4" />
                  {user.nombre}
                  <span className="text-xs font-normal text-[#0032A0]/70 ml-1 border-l border-blue-200 pl-1.5">{rolLabel[user.rol] ?? user.rol}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-[#0032A0] transition-colors">Iniciar Sesión</Link>
                <Link href="/registro" className="ml-2 px-4 py-2 rounded-md bg-[#0032A0] text-white text-sm font-semibold hover:bg-[#00205B] transition-colors">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="h-1 w-full bg-gradient-to-r from-[#00205B] via-[#0032A0] to-[#1B6EC2]" />
      <div className="bg-[#00205B] text-white py-1.5 px-4 hidden md:flex items-center justify-center gap-6 text-xs">
        <span className="badge-connected">PDI Integrado</span>
        <span className="badge-connected">SAG Integrado</span>
        <span className="badge-connected">Registro Civil</span>
        <span className="ml-auto flex items-center gap-1.5 text-green-300">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
          Sistema operativo 24/7
        </span>
        <span className="text-white/60 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Conexión segura TLS 1.3
        </span>
      </div>
      <main id="main-content" role="main" className={fullWidth ? "flex-1 w-full" : "flex-1 w-full container mx-auto px-4 py-8"}>
        {children}
      </main>
      <footer role="contentinfo" className="bg-[#00205B] text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-bold text-white">Servicio Nacional de Aduanas</p>
              <p className="text-white/70 text-sm mt-1">Ministerio de Hacienda — República de Chile</p>
            </div>
            <div className="flex gap-4 text-white/70 text-xs">
              <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Accesibilidad</a>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">© 2025 Gobierno de Chile</p>
              <p className="text-green-400 text-xs mt-0.5 flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Disponible 24/7
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
