import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AutorizacionMenor() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Autorización enviada", description: "El documento ha sido cargado exitosamente para revisión." });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Subir Autorización de Menor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Nombre completo del menor</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>RUT del menor</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Nombre del tutor/acompañante</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Relación con el menor</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Fecha programada de viaje</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-2">
                  <Label>Documento Notarial (PDF)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50">
                    <p className="text-sm text-gray-500 mb-4">Arrastre el documento aquí o haga clic para seleccionar</p>
                    <Button type="button" variant="outline">Seleccionar archivo</Button>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">Enviar Documentación</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}