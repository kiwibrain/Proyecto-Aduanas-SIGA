import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AduanaDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState([
    { id: 1, nombre: "María González", tipo: "Declaración Productos", hora: "09:42", estado: "Pendiente" },
    { id: 2, nombre: "Carlos Fuentes", tipo: "Registro Vehículo", hora: "09:35", estado: "En Revisión" },
    { id: 3, nombre: "Ana Rodríguez", tipo: "Declaración Productos", hora: "09:28", estado: "Pendiente" },
    { id: 4, nombre: "José Martínez", tipo: "Autorización Menor", hora: "09:15", estado: "En Revisión" }
  ]);

  const handleAction = (id: number, accion: string) => {
    setQueue(queue.filter(q => q.id !== id));
    toast({ title: `Trámite ${accion}`, description: "La cola ha sido actualizada." });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Panel Funcionario Aduana</h1>
          <Link href="/funcionario/aduana/reportes">
            <Button variant="outline">Generar Reportes</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cola de Ingresos Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo Trámite</TableHead>
                  <TableHead>Hora Llegada</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.nombre}</TableCell>
                    <TableCell>{q.tipo}</TableCell>
                    <TableCell>{q.hora}</TableCell>
                    <TableCell>
                      <Badge variant={q.estado === "Pendiente" ? "outline" : "secondary"}>
                        {q.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction(q.id, 'aprobado')}>Aprobar</Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive">Rechazar</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rechazar Trámite</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label>Motivo del rechazo</Label>
                                <Input placeholder="Especifique el motivo legal o técnico" />
                              </div>
                              <Button variant="destructive" onClick={() => handleAction(q.id, 'rechazado')} className="w-full">Confirmar Rechazo</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">No hay trámites pendientes</TableCell>
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