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
import { Shield, Eye } from "lucide-react";

type EstadoTramite = "Pendiente" | "En Revisión" | "Finalizado" | "Rechazado";

interface TramiteEntry {
  id: number;
  nombre: string;
  rut: string;
  nacionalidad: string;
  fechaNacimiento: string;
  tipo: string;
  hora: string;
  estado: EstadoTramite;
  productosDeclarados: string;
  valorDeclarado: string;
  vehiculo: string;
  motivoViaje: string;
}

export default function AduanaDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<TramiteEntry[]>([
    {
      id: 1, nombre: "María González", rut: "17.543.210-K", nacionalidad: "Chilena",
      fechaNacimiento: "22/07/1990", tipo: "Declaración Productos", hora: "09:42",
      estado: "Pendiente", productosDeclarados: "Laptop MacBook Pro (USD 1.200), 2 perfumes (USD 150)",
      valorDeclarado: "USD 1.350", vehiculo: "No declara", motivoViaje: "Turismo"
    },
    {
      id: 2, nombre: "Carlos Fuentes", rut: "12.876.543-2", nacionalidad: "Argentina",
      fechaNacimiento: "05/03/1978", tipo: "Registro Vehículo", hora: "09:35",
      estado: "En Revisión", productosDeclarados: "Sin declaración de productos",
      valorDeclarado: "—", vehiculo: "Toyota Corolla BBCD·12 (2019)", motivoViaje: "Turismo"
    },
    {
      id: 3, nombre: "Ana Rodríguez", rut: "20.112.334-5", nacionalidad: "Peruana",
      fechaNacimiento: "14/11/1995", tipo: "Declaración Productos", hora: "09:28",
      estado: "Pendiente", productosDeclarados: "Ropa (x8 prendas), Calzado (x3 pares)",
      valorDeclarado: "USD 420", vehiculo: "No declara", motivoViaje: "Vacaciones"
    },
    {
      id: 4, nombre: "José Martínez", rut: "9.432.101-8", nacionalidad: "Chileno",
      fechaNacimiento: "30/06/1965", tipo: "Autorización Menor", hora: "09:15",
      estado: "En Revisión", productosDeclarados: "Sin declaración de productos",
      valorDeclarado: "—", vehiculo: "Chevrolet Spark FFGG·34 (2021)", motivoViaje: "Visita familiar"
    }
  ]);

  const handleFinalizar = (id: number) => {
    setQueue(q => q.map(e => e.id === id ? { ...e, estado: "Finalizado" as EstadoTramite } : e));
    toast({ title: "Trámite finalizado", description: "El estado ha sido actualizado a Finalizado." });
  };

  const handleRechazar = (id: number) => {
    setQueue(q => q.map(e => e.id === id ? { ...e, estado: "Rechazado" as EstadoTramite } : e));
    toast({ title: "Trámite rechazado", description: "El trámite ha sido marcado como rechazado." });
  };

  const estadoBadge = (estado: EstadoTramite) => {
    switch (estado) {
      case "Pendiente":  return "bg-amber-100 text-amber-800 border-amber-200";
      case "En Revisión": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Finalizado": return "bg-green-100 text-green-800 border-green-200";
      case "Rechazado":  return "bg-red-100 text-red-800 border-red-200";
    }
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
              <span className="text-3xl font-bold text-gray-900">{queue.filter(q => q.estado === "Pendiente").length}</span>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">En Revisión</p>
              <span className="text-3xl font-bold text-gray-900">{queue.filter(q => q.estado === "En Revisión").length}</span>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-green-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Finalizados hoy</p>
              <span className="text-3xl font-bold text-green-600">{queue.filter(q => q.estado === "Finalizado").length + 142}</span>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-red-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Rechazados hoy</p>
              <span className="text-3xl font-bold text-red-600">{queue.filter(q => q.estado === "Rechazado").length + 8}</span>
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
                  <TableHead>RUT</TableHead>
                  <TableHead>Tipo Trámite</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => {
                  const enRevision = q.estado === "En Revisión";
                  const yaResuelto = q.estado === "Finalizado" || q.estado === "Rechazado";
                  return (
                    <TableRow key={q.id} className={
                      q.estado === "Pendiente" ? "bg-amber-50/30" :
                      q.estado === "En Revisión" ? "bg-blue-50/20" :
                      q.estado === "Finalizado" ? "bg-green-50/20" : "bg-red-50/20"
                    }>
                      <TableCell className="font-semibold pl-6">{q.nombre}</TableCell>
                      <TableCell className="font-mono text-sm text-gray-600">{q.rut}</TableCell>
                      <TableCell className="text-gray-600">{q.tipo}</TableCell>
                      <TableCell className="text-gray-500 font-mono text-sm">{q.hora}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={estadoBadge(q.estado)}>{q.estado}</Badge>
                      </TableCell>
                      <TableCell className="pr-6">
                        <div className="flex gap-2 items-center">
                          {/* Ver detalles */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 gap-1">
                                <Eye className="h-3.5 w-3.5" /> Detalles
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="text-xl">Datos completos — {q.nombre}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="bg-gray-50 rounded-lg p-3 border">
                                    <p className="text-xs text-gray-500 mb-0.5">RUT</p>
                                    <p className="font-semibold font-mono">{q.rut}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3 border">
                                    <p className="text-xs text-gray-500 mb-0.5">Nacionalidad</p>
                                    <p className="font-semibold">{q.nacionalidad}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3 border">
                                    <p className="text-xs text-gray-500 mb-0.5">Fecha de nacimiento</p>
                                    <p className="font-semibold">{q.fechaNacimiento}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3 border">
                                    <p className="text-xs text-gray-500 mb-0.5">Motivo de viaje</p>
                                    <p className="font-semibold">{q.motivoViaje}</p>
                                  </div>
                                  <div className="bg-gray-50 rounded-lg p-3 border col-span-2">
                                    <p className="text-xs text-gray-500 mb-0.5">Vehículo</p>
                                    <p className="font-semibold">{q.vehiculo}</p>
                                  </div>
                                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 col-span-2">
                                    <p className="text-xs text-amber-700 mb-0.5 font-medium">Productos declarados</p>
                                    <p className="font-medium text-sm">{q.productosDeclarados}</p>
                                    <p className="text-xs text-gray-500 mt-1">Valor total: <strong>{q.valorDeclarado}</strong></p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Acciones principales */}
                          {yaResuelto ? null : enRevision ? (
                            <>
                              <Button size="sm" disabled className="bg-gray-200 text-gray-400 cursor-not-allowed">Finalizar</Button>
                              <Button size="sm" disabled className="bg-gray-200 text-gray-400 cursor-not-allowed">Rechazar</Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" className="bg-[#14883F] hover:bg-[#0f6830] text-white" onClick={() => handleFinalizar(q.id)}>
                                Finalizar
                              </Button>
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
                                    <Button variant="destructive" onClick={() => handleRechazar(q.id)} className="w-full bg-[#D52B1E] hover:bg-[#b52418]">
                                      Confirmar Rechazo
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-12">No hay trámites en la cola</TableCell>
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
