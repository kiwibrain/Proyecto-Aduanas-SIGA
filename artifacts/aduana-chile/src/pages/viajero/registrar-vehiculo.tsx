import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function RegistrarVehiculo() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registro enviado", description: "El registro de vehículo ha sido ingresado al sistema." });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registrar Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patente</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Marca</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Año</Label>
                  <Input type="number" min="1900" max="2026" required />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>País de origen</Label>
                  <Input required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tipo de ingreso</Label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
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