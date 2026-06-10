import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DeclararProductos() {
  const { toast } = useToast();
  const [items, setItems] = useState([
    { desc: "Laptop MacBook Pro", cant: 1, valor: 1200, pais: "USA", cat: "Electrónica" }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Declaración enviada", description: "Su declaración ha sido registrada exitosamente." });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Declaración de Productos</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Agregar Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Descripción del artículo</Label>
                  <Input placeholder="Ej: Cámara fotográfica" />
                </div>
                <div className="space-y-2">
                  <Label>Cantidad</Label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label>Valor declarado (USD)</Label>
                  <Input type="number" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label>País de origen</Label>
                  <Input />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Seleccione categoría" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronica">Electrónica</SelectItem>
                      <SelectItem value="Ropa">Ropa</SelectItem>
                      <SelectItem value="Alimentos">Alimentos</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="button" variant="secondary">Agregar a la lista</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Declarados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cant.</TableHead>
                  <TableHead>Valor (USD)</TableHead>
                  <TableHead>Origen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{i.desc}</TableCell>
                    <TableCell>{i.cat}</TableCell>
                    <TableCell>{i.cant}</TableCell>
                    <TableCell>${i.valor}</TableCell>
                    <TableCell>{i.pais}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSubmit}>Enviar Declaración Completa</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}