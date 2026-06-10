import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BarChart3 } from "lucide-react";

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
      case 'Alto': return "bg-red-100 text-red-800 border-red-200";
      case 'Medio': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-green-100 text-green-800 border-green-200";
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
              <p className="text-3xl font-bold text-gray-900 mt-1">{queue.length}</p>
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
                  <TableHead>Productos Declarados</TableHead>
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
                    <TableCell className="text-gray-600">{q.productos}</TableCell>
                    <TableCell className="font-mono font-medium">${q.valor}</TableCell>
                    <TableCell>
                      <Badge className={getRiesgoColor(q.riesgo)} variant="outline">{q.riesgo}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">{q.estado}</Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-[#D97706] text-[#D97706] hover:bg-amber-50">Revisar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-xl">Revisión SAG: {q.viajero}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-lg">
                              <p className="text-sm font-semibold text-amber-800 mb-1">Detalle de productos declarados:</p>
                              <p className="text-lg font-medium">{q.productos}</p>
                              <div className="mt-3 pt-3 border-t border-amber-100 flex justify-between">
                                <span className="text-sm text-gray-500">Valor estimado:</span>
                                <span className="font-mono font-bold">${q.valor}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                              <Button className="bg-[#14883F] hover:bg-[#0f6830] text-white h-12" onClick={() => handleReview(q.id, 'Aprobada sin retención')}>Aprobar Libre Tránsito</Button>
                              <Button variant="destructive" className="bg-[#D52B1E] hover:bg-[#b52418] h-12" onClick={() => handleReview(q.id, 'Retenida/Decomisada')}>Retener / Decomisar</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-12">No hay revisiones pendientes</TableCell>
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