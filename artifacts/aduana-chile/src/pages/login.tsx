import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <Layout>
      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuario</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
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
                <Label htmlFor="rut">RUT o Correo Electrónico</Label>
                <Input id="rut" placeholder="Ej: 12.345.678-9" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Ingresar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}