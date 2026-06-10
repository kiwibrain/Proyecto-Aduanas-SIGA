import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { formatPatente, validatePatente } from "@/lib/masks";
import { AlertCircle, CheckCircle2, Info, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function RegistrarVehiculo() {
  const { toast } = useToast();
  
  const [patente, setPatente] = useState("");
  const [patenteValida, setPatenteValida] = useState<boolean | null>(null);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [año, setAño] = useState("");
  const [color, setColor] = useState("");
  const [pais, setPais] = useState("");
  const [plazas, setPlazas] = useState("5");
  const [tipo, setTipo] = useState("");
  const [isPrefilled, setIsPrefilled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vehiculo_frecuente");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.patente) {
          setPatente(data.patente);
          setPatenteValida(validatePatente(data.patente));
          setMarca(data.marca || "");
          setModelo(data.modelo || "");
          setAño(data.año || "");
          setColor(data.color || "");
          setIsPrefilled(true);
        }
      } catch (e) {
        // ignore JSON errors
      }
    }
  }, []);

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPatente(e.target.value);
    setPatente(formatted);
    setPatenteValida(formatted.length >= 6 ? validatePatente(formatted) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patenteValida === false) {
      toast({ title: "Error", description: "Revise la patente", variant: "destructive" });
      return;
    }
    
    const numAño = Number(año);
    const currentYear = new Date().getFullYear();
    if (numAño < 1900 || numAño > currentYear + 1) {
      toast({ title: "Error", description: `El año debe estar entre 1900 y ${currentYear + 1}`, variant: "destructive" });
      return;
    }
    
    localStorage.setItem("vehiculo_frecuente", JSON.stringify({ patente, marca, modelo, año, color }));

    toast({ title: "Registro enviado", description: "El registro de vehículo ha sido ingresado al sistema." });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/viajero" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0032A0] transition-colors">
          <ChevronLeft className="h-4 w-4" /> Volver a mi panel
        </Link>
        {isPrefilled && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
            <p className="text-sm font-medium">Hemos completado los campos con su vehículo registrado anteriormente. Puede modificarlos si es necesario.</p>
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registrar Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patente">Patente</Label>
                  <div className="relative">
                    <Input 
                      id="patente" 
                      value={patente} 
                      onChange={handlePatenteChange} 
                      required 
                      placeholder="AABB·12 o BB·1234"
                      aria-invalid={patenteValida === false}
                      aria-describedby={patenteValida === false ? "patente-error" : "patente-hint"}
                    />
                    {patenteValida && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {patenteValida === false ? (
                    <p id="patente-error" className="text-sm text-red-500 flex items-start gap-1">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" /> El formato de patente debe ser AABB12 (4 letras seguidas de 2 números) o AB1234
                    </p>
                  ) : (
                    <p id="patente-hint" className="text-xs text-gray-500">Formato: AABB12 (letras y números)</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Input id="marca" value={marca} onChange={e => setMarca(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input id="modelo" value={modelo} onChange={e => setModelo(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="año">Año</Label>
                  <Input 
                    id="año" 
                    type="number" 
                    value={año} 
                    onChange={e => setAño(e.target.value)} 
                    min="1900" 
                    max={new Date().getFullYear() + 1} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" value={color} onChange={e => setColor(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plazas">Plazas</Label>
                  <Input id="plazas" type="number" value={plazas} onChange={e => setPlazas(e.target.value)} min="1" max="9" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">País de origen</Label>
                  <Input id="pais" value={pais} onChange={e => setPais(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de ingreso</Label>
                  <Select required value={tipo} onValueChange={setTipo}>
                    <SelectTrigger id="tipo"><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temporal">Temporal</SelectItem>
                      <SelectItem value="definitivo">Definitivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">Registrar Vehículo</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}