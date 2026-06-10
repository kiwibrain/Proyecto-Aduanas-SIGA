import { Link } from "wouter";
import { GovernmentLogo } from "./GovernmentLogo";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200" style={{ borderBottomWidth: "1px", borderBottomColor: "#e5e7eb" }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <GovernmentLogo />
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Iniciar Sesión</Link>
            <Link href="/registro" className="hover:text-primary transition-colors">Registrarse</Link>
          </div>
        </div>
      </header>
      <div className="h-1 w-full bg-[#0032A0]" style={{ backgroundColor: "#0032A0" }} />
      <main className="flex-1 w-full container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Servicio Nacional de Aduanas | Ministerio de Hacienda — Gobierno de Chile</p>
        </div>
      </footer>
    </div>
  );
}