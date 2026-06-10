import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SAGDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState([
    { id: 1, viajero: "Pedro Pascal", productos: "Semillas, Miel", valor: 45, riesgo: "Alto", estado: "Pendiente" },
    { id: 2, viajero: "Camila Vallejo", productos: "Ropa, Electrónica", valor: 450, riesgo: "Bajo", estado: "Pendiente" }
  ]);

  const handleReview = (id: number, decision: string) => {
    setQueue(queue.filter(q => q.id !== id));
    toast({ title: "Revisión completada", description: `Declaración marcada como ${decision}.` });
  };

  const getRiesgoColor = (riesgo: string) => {
    switch(riesgo) {
      case 'Alto': return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100";
      case 'Medio': return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
      default: return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100";
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel Funcionario SAG</h1>

        <Card>
          <CardHeader>
            <CardTitle>Cola de Revisión Fitozoosanitaria</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Viajero</TableHead>
                  <TableHead>Productos Declarados</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Nivel Riesgo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.viajero}</TableCell>
                    <TableCell>{q.productos}</TableCell>
                    <TableCell>${q.valor}</TableCell>
                    <TableCell>
                      <Badge className={getRiesgoColor(q.riesgo)} variant="outline">{q.riesgo}</Badge>
                    </TableCell>
                    <TableCell><Badge variant="outline">{q.estado}</Badge></TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">Revisar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Revisión SAG: {q.viajero}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <p className="text-sm font-semibold mb-2">Detalle de productos:</p>
                              <p className="text-sm">{q.productos}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleReview(q.id, 'Aprobada sin retención')}>Aprobar Libre Tránsito</Button>
                              <Button className="flex-1" variant="destructive" onClick={() => handleReview(q.id, 'Retenida/Decomisada')}>Retener / Decomisar</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">No hay revisiones pendientes</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}