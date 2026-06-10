import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Plane, Car, Users, FileText, Shield, CheckCircle, ArrowRight, Globe, Lock, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <Layout fullWidth>
      <div>
        {/* HERO */}
        <section className="hero-gradient text-white py-20 px-4">
          <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                      <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
                <Shield className="h-3 w-3" /> Portal Oficial · Gobierno de Chile
              </span>
              <h1 className="text-6xl md:text-7xl font-black leading-none mb-3 tracking-tight">
                SIGA
              </h1>
              <p className="text-[#7BC8FF] text-lg font-semibold mb-3 uppercase tracking-widest">
                Sistema Digital de Gestión Aduanera
              </p>
              <p className="text-white/80 text-base mb-8 max-w-lg">
                Realice sus trámites de frontera de forma digital, rápida y segura desde cualquier dispositivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/registro" className="px-6 py-3 bg-[#D52B1E] hover:bg-[#b52418] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  Registrarse Gratis <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-lg transition-colors flex items-center justify-center">
                  Ya tengo cuenta
                </Link>
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-end">
              <div className="grid grid-cols-2 gap-3 max-w-xs w-full">
                {[
                  { icon: <FileText className="h-6 w-6" />, label: "Declaración SAG", color: "bg-white/10" },
                  { icon: <Car className="h-6 w-6" />, label: "Registro Vehículo", color: "bg-[#D52B1E]/20" },
                  { icon: <Users className="h-6 w-6" />, label: "Autorización Menor", color: "bg-white/10" },
                  { icon: <Globe className="h-6 w-6" />, label: "Control Migratorio", color: "bg-white/10" },
                ].map((item, i) => (
                  <div key={i} className={`${item.color} border border-white/20 rounded-xl p-4 text-white/90 text-center`}>
                    <div className="flex justify-center mb-2">{item.icon}</div>
                    <p className="text-xs font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-white border-b border-gray-100 py-6">
          <div className="container mx-auto max-w-5xl px-4 flex flex-wrap justify-center md:justify-between items-center gap-6 text-center">
            {[
              { value: "24/7", label: "Disponibilidad" },
              { value: "<3 seg", label: "Tiempo de respuesta" },
              { value: "TLS 1.3", label: "Seguridad" },
              { value: "3 sistemas", label: "Integrado con PDI, SAG, RC" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0032A0]">{s.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ROLE CARDS */}
        <section className="bg-[#F7F8FA] py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">¿Cómo deseas ingresar?</h2>
            <p className="text-center text-gray-500 mb-10">Seleccione su perfil para acceder a las funciones correspondientes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { 
                  title: "Viajero", 
                  desc: "Declare productos, registre su vehículo y gestione autorizaciones de menores.", 
                  icon: <Plane className="h-8 w-8" />, 
                  href: "/login", 
                  btnLabel: "Ingresar",
                  accent: "border-t-[#0032A0]",
                  iconBg: "bg-blue-50 text-[#0032A0]",
                  btnClass: "bg-[#0032A0] hover:bg-[#00205B] text-white"
                },
                { 
                  title: "Funcionario Aduana", 
                  desc: "Gestión de trámites, aprobación de ingresos y generación de reportes.", 
                  icon: <Shield className="h-8 w-8" />, 
                  href: "/login", 
                  btnLabel: "Acceso Aduana",
                  accent: "border-t-[#D52B1E]",
                  iconBg: "bg-red-50 text-[#D52B1E]",
                  btnClass: "bg-[#D52B1E] hover:bg-[#b52418] text-white"
                },
                { 
                  title: "Funcionario PDI", 
                  desc: "Validación de identidad y control migratorio en fronteras.", 
                  icon: <Lock className="h-8 w-8" />, 
                  href: "/login", 
                  btnLabel: "Acceso PDI",
                  accent: "border-t-[#14883F]",
                  iconBg: "bg-green-50 text-[#14883F]",
                  btnClass: "bg-[#14883F] hover:bg-[#0f6830] text-white"
                },
                { 
                  title: "Funcionario SAG", 
                  desc: "Revisión fitosanitaria y control de productos declarados.", 
                  icon: <BarChart3 className="h-8 w-8" />, 
                  href: "/login", 
                  btnLabel: "Acceso SAG",
                  accent: "border-t-[#F59E0B]",
                  iconBg: "bg-amber-50 text-[#D97706]",
                  btnClass: "bg-[#D97706] hover:bg-[#b45309] text-white"
                },
              ].map((role, i) => (
                <div key={i} className={`bg-white rounded-xl shadow-sm border border-gray-100 border-t-4 ${role.accent} p-6 flex flex-col hover:shadow-md transition-shadow`}>
                  <div className={`w-14 h-14 rounded-xl ${role.iconBg} flex items-center justify-center mb-4`}>
                    {role.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{role.title}</h3>
                  <p className="text-gray-500 text-sm flex-1 mb-5">{role.desc}</p>
                  <Link href={role.href} className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors text-center ${role.btnClass}`}>
                    {role.btnLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">¿Cómo funciona?</h2>
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
              {[
                { step: "01", icon: <CheckCircle className="h-6 w-6" />, title: "Regístrate", desc: "Crea tu cuenta con tu RUT y datos personales. Proceso en menos de 2 minutos.", color: "text-[#0032A0] bg-blue-50" },
                { step: "02", icon: <FileText className="h-6 w-6" />, title: "Declara", desc: "Completa la declaración SAG y registra vehículo o menores si corresponde.", color: "text-[#D52B1E] bg-red-50" },
                { step: "03", icon: <Globe className="h-6 w-6" />, title: "Llega al cruce", desc: "Presenta tu código QR en el control fronterizo. Los funcionarios ya tienen tu información.", color: "text-[#14883F] bg-green-50" },
                { step: "04", icon: <ArrowRight className="h-6 w-6" />, title: "Cruza la frontera", desc: "Con todas las validaciones aprobadas, obtienes el comprobante de ingreso.", color: "text-[#D97706] bg-amber-50" },
              ].map((step, i) => (
                <div key={i} className="flex-1 text-center flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-3`}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-gray-100 mb-1">{step.step}</span>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm max-w-[180px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}