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

        {/* ACCESS SECTION */}
        <section className="bg-[#F7F8FA] py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">¿Cómo deseas ingresar?</h2>
            <p className="text-center text-gray-500 mb-12">Seleccione su perfil para acceder a las funciones correspondientes</p>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

              {/* VIAJERO — tarjeta prominente */}
              <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 border-t-4 border-t-[#0032A0] p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#0032A0] flex items-center justify-center mb-5">
                  <Plane className="h-10 w-10" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0032A0] mb-1">Acceso ciudadano</span>
                <h3 className="font-extrabold text-gray-900 text-2xl mb-3">Viajero</h3>
                <p className="text-gray-500 text-sm flex-1 mb-6 max-w-xs">
                  Declare sus productos, registre su vehículo y gestione autorizaciones de menores para cruzar la frontera.
                </p>
                <Link href="/login" className="w-full py-3 px-6 rounded-xl bg-[#0032A0] hover:bg-[#00205B] text-white font-bold text-base transition-colors text-center">
                  Ingresar como Viajero
                </Link>
              </div>

              {/* DIVIDER */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-2 px-2">
                <div className="w-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap bg-[#F7F8FA] px-2 py-1 rounded-full border border-gray-200">o bien</span>
                <div className="w-px flex-1 bg-gray-200" />
              </div>
              <div className="lg:hidden flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">o bien</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* FUNCIONARIOS — panel agrupado */}
              <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Acceso institucional</span>
                  <h3 className="font-extrabold text-gray-900 text-2xl mt-1">Ingreso de Funcionarios</h3>
                  <p className="text-gray-500 text-sm mt-2">Acceso exclusivo para personal de organismos fiscalizadores del Estado.</p>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {[
                    {
                      title: "Aduana",
                      desc: "Gestión de trámites y aprobación de ingresos",
                      icon: <Shield className="h-5 w-5" />,
                      iconBg: "bg-red-50 text-[#D52B1E]",
                      btnClass: "border-[#D52B1E] text-[#D52B1E] hover:bg-[#D52B1E] hover:text-white",
                    },
                    {
                      title: "PDI",
                      desc: "Validación de identidad y control migratorio",
                      icon: <Lock className="h-5 w-5" />,
                      iconBg: "bg-green-50 text-[#14883F]",
                      btnClass: "border-[#14883F] text-[#14883F] hover:bg-[#14883F] hover:text-white",
                    },
                    {
                      title: "SAG",
                      desc: "Revisión fitosanitaria y productos declarados",
                      icon: <BarChart3 className="h-5 w-5" />,
                      iconBg: "bg-amber-50 text-[#D97706]",
                      btnClass: "border-[#D97706] text-[#D97706] hover:bg-[#D97706] hover:text-white",
                    },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-gray-200 transition-all">
                      <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0`}>
                        {f.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">Funcionario {f.title}</p>
                        <p className="text-gray-400 text-xs truncate">{f.desc}</p>
                      </div>
                      <Link href="/login-funcionario" className={`shrink-0 px-4 py-1.5 rounded-lg border-2 font-semibold text-xs transition-colors ${f.btnClass}`}>
                        Acceder
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

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