import { Link } from "wouter";
import { GovernmentLogo } from "./GovernmentLogo";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-700 text-white px-4 py-2 rounded z-50">Saltar al contenido principal</a>
      <header role="banner" className="bg-white border-b border-gray-200" style={{ borderBottomWidth: "1px", borderBottomColor: "#e5e7eb" }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <GovernmentLogo />
          </Link>
          <nav aria-label="Navegación principal" className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 p-1 rounded">Inicio</Link>
            <Link href="/login" className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 p-1 rounded">Iniciar Sesión</Link>
            <Link href="/registro" className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 p-1 rounded">Registrarse</Link>
          </nav>
        </div>
      </header>
      <div className="h-1 w-full bg-[#0032A0]" style={{ backgroundColor: "#0032A0" }} />
      <main id="main-content" role="main" className="flex-1 w-full container mx-auto px-4 py-8">
        {children}
      </main>
      <footer role="contentinfo" className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Servicio Nacional de Aduanas | Ministerio de Hacienda — Gobierno de Chile</p>
        </div>
      </footer>
    </div>
  );
}