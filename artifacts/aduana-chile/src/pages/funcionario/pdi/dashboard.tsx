import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PDIDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState([
    { id: 1, nombre: "Roberto Gómez", documento: "PAS-89211", pais: "Argentina", estado: "Esperando" },
    { id: 2, nombre: "Laura Silva", documento: "15.221.849-K", pais: "Chile", estado: "Esperando" }
  ]);

  const handleValidation = (id: number, status: string) => {
    setQueue(queue.filter(q => q.id !== id));
    toast({ title: "Identidad validada", description: `El pasajero ha sido marcado como ${status}.` });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel Funcionario PDI</h1>

        <Card>
          <CardHeader>
            <CardTitle>Validación de Identidad Migratoria</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Viajero</TableHead>
                  <TableHead>N° Documento</TableHead>
                  <TableHead>País Origen</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.nombre}</TableCell>
                    <TableCell>{q.documento}</TableCell>
                    <TableCell>{q.pais}</TableCell>
                    <TableCell><Badge variant="outline">{q.estado}</Badge></TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="default">Validar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Identidad: {q.nombre}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <p className="text-sm text-gray-600">Verifique los antecedentes del pasajero con la base de datos nacional y sistemas internacionales.</p>
                            <div className="grid grid-cols-2 gap-4">
                              <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleValidation(q.id, 'Validado')}>Aprobar Ingreso</Button>
                              <Button variant="destructive" onClick={() => handleValidation(q.id, 'Observado')}>Observar / Retener</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">Cola migratoria vacía</TableCell>
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