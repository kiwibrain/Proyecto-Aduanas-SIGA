import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle, Lock } from "lucide-react";
import { GovernmentLogo } from "@/components/GovernmentLogo";

export default function Login() {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState("viajero");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "viajero") setLocation("/viajero");
    else if (role === "aduana") setLocation("/funcionario/aduana");
    else if (role === "pdi") setLocation("/funcionario/pdi");
    else if (role === "sag") setLocation("/funcionario/sag");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - blue */}
      <div className="hidden md:flex hero-gradient w-1/2 p-12 flex-col justify-center text-white relative">
        <Link href="/" className="absolute top-8 left-8 hover:opacity-90 transition-opacity">
          <GovernmentLogo />
        </Link>
        <div className="mt-16">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-8 w-fit">
            <Shield className="h-3 w-3" /> Acceso Seguro
          </div>
          <h2 className="text-3xl font-extrabold mb-4">Bienvenido al SIGA</h2>
          <p className="text-white/80 mb-8">Sistema Integrado de Gestión Aduanera del Gobierno de Chile.</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm">Trámites disponibles 24 horas, 7 días a la semana</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm">Información protegida con cifrado TLS 1.3</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <span className="text-white/80 text-sm">Integrado con PDI, SAG y Registro Civil</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Right - white */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F7F8FA] relative">
        <Link href="/" className="md:hidden absolute top-8 left-8 hover:opacity-90 transition-opacity">
          <GovernmentLogo />
        </Link>
        <div className="w-full max-w-sm mt-16 md:mt-0">
          <Card className="shadow-lg border-gray-100">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="role" className="font-semibold text-gray-700">Tipo de Usuario</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viajero">Viajero</SelectItem>
                      <SelectItem value="aduana">Funcionario Aduana</SelectItem>
                      <SelectItem value="pdi">Funcionario PDI</SelectItem>
                      <SelectItem value="sag">Funcionario SAG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rut" className="font-semibold text-gray-700">RUT o Correo Electrónico</Label>
                  <Input id="rut" placeholder="Ej: 12.345.678-9" required className="bg-gray-50 border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold text-gray-700">Contraseña</Label>
                  <Input id="password" type="password" required className="bg-gray-50 border-gray-200" />
                </div>
                <Button type="submit" className="w-full bg-[#0032A0] hover:bg-[#00205B] text-white py-2.5">
                  Ingresar
                </Button>
              </form>
              <div className="mt-6 text-center space-y-4">
                <Link href="/registro" className="text-[#0032A0] hover:text-[#00205B] text-sm font-semibold inline-block">
                  ¿No tienes cuenta? Regístrate aquí
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-2">
                  <Lock className="h-3 w-3" />
                  <span>Tus datos son protegidos bajo cifrado TLS 1.3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}