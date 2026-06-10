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
import { Shield } from "lucide-react";

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
      <div className="-mx-4 -mt-8 mb-8">
        <section className="bg-gradient-to-r from-[#00205B] to-[#0032A0] text-white py-10 px-4 shadow-sm">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-300" />
                <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Módulo Operativo</span>
              </div>
              <h1 className="text-3xl font-extrabold">Panel Funcionario Aduana</h1>
              <p className="text-white/80 mt-1">Conectado con PDI · SAG</p>
            </div>
            <Link href="/funcionario/aduana/reportes">
              <Button className="bg-white text-[#0032A0] hover:bg-gray-100 font-bold shadow-md">
                Generar Reportes
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-t-4 border-t-amber-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Pendientes</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-gray-900">{queue.filter(q => q.estado === "Pendiente").length}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">En Revisión</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-gray-900">{queue.filter(q => q.estado === "En Revisión").length}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-green-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Aprobados hoy</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-green-600">142</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-red-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Rechazados hoy</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-red-600">8</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-gray-100 overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle>Cola de Ingresos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="pl-6">Nombre</TableHead>
                  <TableHead>Tipo Trámite</TableHead>
                  <TableHead>Hora Llegada</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id} className={q.estado === "Pendiente" ? "bg-amber-50/30" : "bg-blue-50/30"}>
                    <TableCell className="font-semibold pl-6">{q.nombre}</TableCell>
                    <TableCell className="text-gray-600">{q.tipo}</TableCell>
                    <TableCell className="text-gray-500 font-mono text-sm">{q.hora}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        q.estado === "Pendiente" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200"
                      }>
                        {q.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#14883F] hover:bg-[#0f6830] text-white" onClick={() => handleAction(q.id, 'aprobado')}>Aprobar</Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive" className="bg-[#D52B1E] hover:bg-[#b52418]">Rechazar</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rechazar Trámite</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label>Motivo del rechazo para {q.nombre}</Label>
                                <Input placeholder="Especifique el motivo legal o técnico" />
                              </div>
                              <Button variant="destructive" onClick={() => handleAction(q.id, 'rechazado')} className="w-full bg-[#D52B1E] hover:bg-[#b52418]">Confirmar Rechazo</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-12">No hay trámites pendientes en la cola</TableCell>
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