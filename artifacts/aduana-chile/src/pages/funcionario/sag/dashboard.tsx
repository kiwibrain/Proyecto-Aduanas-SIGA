import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, CheckCircle2, XCircle } from "lucide-react";

type ItemEstado = "Pendiente" | "Aprobado" | "Retenido";

interface SAGItem {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: string;
  estado: ItemEstado;
}

interface SAGEntry {
  id: number;
  viajero: string;
  rut: string;
  items: SAGItem[];
  valor: number;
  riesgo: string;
  estado: string;
}

export default function SAGDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<SAGEntry[]>([
    {
      id: 1,
      viajero: "Pedro Pascal",
      rut: "12.345.678-9",
      items: [
        { id: 1, nombre: "Semillas de maíz (500g)", categoria: "Fitosanitario", cantidad: "1 bolsa", estado: "Pendiente" },
        { id: 2, nombre: "Miel artesanal", categoria: "Animal procesado", cantidad: "2 frascos (500g c/u)", estado: "Pendiente" },
        { id: 3, nombre: "Flores frescas", categoria: "Material vegetal", cantidad: "1 ramo", estado: "Pendiente" },
      ],
      valor: 45,
      riesgo: "Alto",
      estado: "Pendiente"
    },
    {
      id: 2,
      viajero: "Camila Vallejo",
      rut: "15.221.849-K",
      items: [
        { id: 1, nombre: "Ropa (x5 prendas)", categoria: "Textil", cantidad: "5 unidades", estado: "Pendiente" },
        { id: 2, nombre: "Laptop Dell XPS", categoria: "Electrónica", cantidad: "1 unidad", estado: "Pendiente" },
      ],
      valor: 450,
      riesgo: "Bajo",
      estado: "Pendiente"
    }
  ]);

  const updateItemEstado = (entryId: number, itemId: number, newEstado: ItemEstado) => {
    setQueue(prev => prev.map(entry => {
      if (entry.id !== entryId) return entry;
      const updatedItems = entry.items.map(item =>
        item.id === itemId ? { ...item, estado: newEstado } : item
      );
      const allResolved = updatedItems.every(i => i.estado !== "Pendiente");
      const hasRetained = updatedItems.some(i => i.estado === "Retenido");
      return {
        ...entry,
        items: updatedItems,
        estado: allResolved ? (hasRetained ? "Con Retención" : "Aprobado") : "En Revisión"
      };
    }));
    toast({
      title: newEstado === "Aprobado" ? "Ítem aprobado" : "Ítem retenido",
      description: `El artículo ha sido marcado como ${newEstado}.`
    });
  };

  const getRiesgoColor = (riesgo: string) => {
    switch (riesgo) {
      case 'Alto': return "bg-red-100 text-red-800 border-red-200";
      case 'Medio': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getEntryEstadoColor = (estado: string) => {
    switch (estado) {
      case "Aprobado": return "bg-green-100 text-green-800 border-green-200";
      case "Con Retención": return "bg-red-100 text-red-800 border-red-200";
      case "En Revisión": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Layout>
      <div className="-mx-4 -mt-8 mb-8">
        <section className="bg-gradient-to-r from-[#D97706] to-[#b45309] text-white py-10 px-4 shadow-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-amber-200" />
              <span className="text-amber-100 text-sm font-semibold uppercase tracking-wider">Control Fitozoosanitario</span>
            </div>
            <h1 className="text-3xl font-extrabold">Panel Funcionario SAG</h1>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-300"></span>
              Sistema SAG Nacional Integrado
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-t-4 border-t-amber-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Por revisar</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{queue.filter(q => q.estado === "Pendiente" || q.estado === "En Revisión").length}</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-green-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Aprobados</p>
              <p className="text-3xl font-bold text-green-600 mt-1">210</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-red-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Decomisos</p>
              <p className="text-3xl font-bold text-red-600 mt-1">15</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-red-600 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Riesgo Alto hoy</p>
              <p className="text-3xl font-bold text-red-700 mt-1">4</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-gray-100 overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle>Cola de Revisión Fitozoosanitaria</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="pl-6">Viajero</TableHead>
                  <TableHead>RUT</TableHead>
                  <TableHead>Ítems declarados</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Nivel Riesgo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="pl-6 font-semibold">{q.viajero}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-600">{q.rut}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{q.items.length} ítem{q.items.length !== 1 ? "s" : ""}</span>
                      <div className="flex gap-1 mt-1">
                        {q.items.map(i => (
                          <span key={i.id} className={`inline-block w-2 h-2 rounded-full ${
                            i.estado === "Aprobado" ? "bg-green-400" :
                            i.estado === "Retenido" ? "bg-red-400" : "bg-gray-300"
                          }`} title={`${i.nombre}: ${i.estado}`} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-medium">${q.valor}</TableCell>
                    <TableCell>
                      <Badge className={getRiesgoColor(q.riesgo)} variant="outline">{q.riesgo}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getEntryEstadoColor(q.estado)}>{q.estado}</Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-[#D97706] text-[#D97706] hover:bg-amber-50">Revisar ítems</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="text-xl">Revisión SAG — {q.viajero}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3 border">
                              <span className="text-gray-500">RUT: <strong className="text-gray-800 font-mono">{q.rut}</strong></span>
                              <span className="text-gray-500">Valor total: <strong className="font-mono">${q.valor}</strong></span>
                            </div>

                            <p className="text-sm font-semibold text-gray-700">Ítems declarados — revise individualmente:</p>

                            <div className="space-y-2">
                              {q.items.map((item) => (
                                <div key={item.id} className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-colors ${
                                  item.estado === "Aprobado" ? "bg-green-50 border-green-200" :
                                  item.estado === "Retenido" ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                                }`}>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900">{item.nombre}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.categoria} · {item.cantidad}</p>
                                  </div>
                                  {item.estado === "Pendiente" ? (
                                    <div className="flex gap-1.5 shrink-0">
                                      <Button
                                        size="sm"
                                        className="bg-[#14883F] hover:bg-[#0f6830] text-white h-7 px-2.5 text-xs gap-1"
                                        onClick={() => updateItemEstado(q.id, item.id, "Aprobado")}
                                      >
                                        <CheckCircle2 className="h-3.5 w-3.5" /> Aprobar
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-[#D52B1E] hover:bg-[#b52418] text-white h-7 px-2.5 text-xs gap-1"
                                        onClick={() => updateItemEstado(q.id, item.id, "Retenido")}
                                      >
                                        <XCircle className="h-3.5 w-3.5" /> Retener
                                      </Button>
                                    </div>
                                  ) : (
                                    <Badge variant="outline" className={
                                      item.estado === "Aprobado"
                                        ? "bg-green-100 text-green-800 border-green-300 shrink-0"
                                        : "bg-red-100 text-red-800 border-red-300 shrink-0"
                                    }>
                                      {item.estado}
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>

                            {q.items.every(i => i.estado !== "Pendiente") && (
                              <div className={`p-3 rounded-lg text-sm font-medium text-center ${
                                q.items.some(i => i.estado === "Retenido")
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : "bg-green-50 text-green-700 border border-green-200"
                              }`}>
                                {q.items.some(i => i.estado === "Retenido")
                                  ? `⚠ Revisión completada — ${q.items.filter(i => i.estado === "Retenido").length} ítem(s) retenido(s)`
                                  : "✓ Revisión completada — todos los ítems aprobados"}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-12">No hay revisiones pendientes</TableCell>
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
