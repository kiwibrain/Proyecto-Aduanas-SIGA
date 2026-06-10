import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function AduanaReportes() {
  const { toast } = useToast();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Reporte generado", description: "Mostrando resultados del periodo seleccionado." });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Generador de Reportes</h1>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label>Fecha Desde</Label>
                <Input type="date" required />
              </div>
              <div className="space-y-2">
                <Label>Fecha Hasta</Label>
                <Input type="date" required />
              </div>
              <div className="space-y-2">
                <Label>Tipo Trámite</Label>
                <Select defaultValue="todos">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="declaracion">Declaración</SelectItem>
                    <SelectItem value="vehiculo">Vehículo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Generar Reporte</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Total Procesados</TableHead>
                  <TableHead>Aprobados</TableHead>
                  <TableHead>Rechazados</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>10/06/2025</TableCell>
                  <TableCell>Declaración Productos</TableCell>
                  <TableCell>145</TableCell>
                  <TableCell className="text-green-600">140</TableCell>
                  <TableCell className="text-red-600">5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10/06/2025</TableCell>
                  <TableCell>Registro Vehículo</TableCell>
                  <TableCell>32</TableCell>
                  <TableCell className="text-green-600">30</TableCell>
                  <TableCell className="text-red-600">2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}