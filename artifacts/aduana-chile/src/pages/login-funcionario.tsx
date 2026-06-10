import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, ChevronLeft } from "lucide-react";
import { GovernmentLogo } from "@/components/GovernmentLogo";

export default function LoginFuncionario() {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState("aduana");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "aduana") setLocation("/funcionario/aduana");
    else if (role === "pdi") setLocation("/funcionario/pdi");
    else if (role === "sag") setLocation("/funcionario/sag");
  };

  const roleColors: Record<string, { bg: string; label: string; badge: string }> = {
    aduana: { bg: "bg-[#D52B1E] hover:bg-[#b52418]", label: "Aduana", badge: "bg-red-50 text-[#D52B1E] border-red-200" },
    pdi:    { bg: "bg-[#14883F] hover:bg-[#0f6830]", label: "PDI",    badge: "bg-green-50 text-[#14883F] border-green-200" },
    sag:    { bg: "bg-[#D97706] hover:bg-[#b45309]", label: "SAG",    badge: "bg-amber-50 text-[#D97706] border-amber-200" },
  };

  const current = roleColors[role] ?? roleColors["aduana"];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex hero-gradient w-1/2 p-12 flex-col justify-center text-white relative">
        <Link href="/" className="absolute top-8 left-8 hover:opacity-90 transition-opacity">
          <GovernmentLogo />
        </Link>
        <div className="mt-16">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-8 w-fit border border-white/20">
            <Shield className="h-3 w-3" /> Acceso Institucional
          </div>
          <h2 className="text-3xl font-extrabold mb-3">Portal de Funcionarios</h2>
          <p className="text-white/80 mb-8 text-sm">Acceso exclusivo para personal de organismos fiscalizadores del Estado de Chile.</p>
          <div className="space-y-3">
            {[
              { key: "aduana", color: "border-red-400 text-red-200",   label: "Aduana",  desc: "Gestión de trámites y reportes" },
              { key: "pdi",    color: "border-green-400 text-green-200", label: "PDI",    desc: "Control migratorio e identidad" },
              { key: "sag",    color: "border-amber-400 text-amber-200", label: "SAG",    desc: "Revisión fitosanitaria" },
            ].map((r) => (
              <div key={r.key} className={`flex items-center gap-3 p-3 rounded-xl border ${role === r.key ? "bg-white/15 border-white/40" : "bg-white/5 border-white/10"} transition-colors`}>
                <span className={`text-xs font-bold uppercase tracking-wider ${r.color}`}>{r.label}</span>
                <span className="text-white/60 text-xs">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F7F8FA] relative">
        <Link href="/" className="md:hidden absolute top-8 left-8 hover:opacity-90 transition-opacity">
          <GovernmentLogo />
        </Link>
        <div className="w-full max-w-sm mt-16 md:mt-0">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#0032A0] mb-6 transition-colors">
            <ChevronLeft className="h-3 w-3" /> Volver al inicio
          </Link>
          <Card className="shadow-lg border-gray-100">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Ingreso de Funcionarios</CardTitle>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${current.badge}`}>
                  {current.label}
                </span>
              </div>
              <p className="text-xs text-gray-500">Seleccione su organismo e ingrese sus credenciales institucionales.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="role" className="font-semibold text-gray-700">Organismo</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aduana">Funcionario Aduana</SelectItem>
                      <SelectItem value="pdi">Funcionario PDI</SelectItem>
                      <SelectItem value="sag">Funcionario SAG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut-func" className="font-semibold text-gray-700">RUT Funcionario</Label>
                  <Input id="rut-func" placeholder="Ej: 12.345.678-9" required className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-func" className="font-semibold text-gray-700">Contraseña Institucional</Label>
                  <Input id="password-func" type="password" autoComplete="current-password" required className="bg-gray-50 border-gray-200" />
                </div>
                <Button type="submit" className={`w-full text-white py-2.5 ${current.bg}`}>
                  Ingresar como Funcionario {current.label}
                </Button>
              </form>
              <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Acceso restringido — uso exclusivo institucional</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
