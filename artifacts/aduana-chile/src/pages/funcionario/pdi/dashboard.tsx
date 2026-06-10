import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

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
      <div className="-mx-4 -mt-8 mb-8">
        <section className="bg-gradient-to-r from-[#14883F] to-[#0f6830] text-white py-10 px-4 shadow-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-green-200" />
              <span className="text-green-100 text-sm font-semibold uppercase tracking-wider">Control Migratorio</span>
            </div>
            <h1 className="text-3xl font-extrabold">Panel Funcionario PDI</h1>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-300"></span>
              Conectado con Registro Civil e Interpol
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-t-4 border-t-amber-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">En cola</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{queue.length}</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-green-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Validados hoy</p>
              <p className="text-3xl font-bold text-green-600 mt-1">345</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-red-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Rechazados hoy</p>
              <p className="text-3xl font-bold text-red-600 mt-1">12</p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500">Pendientes Interpol</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">0</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-gray-100 overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle>Validación de Identidad Migratoria</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="pl-6">Nombre Viajero</TableHead>
                  <TableHead>N° Documento</TableHead>
                  <TableHead>País Origen</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="pl-6 font-semibold">{q.nombre}</TableCell>
                    <TableCell className="font-mono text-sm">{q.documento}</TableCell>
                    <TableCell>{q.pais}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                        {q.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-[#0032A0] hover:bg-[#00205B] text-white w-24">Validar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-xl">Confirmar Identidad</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="font-bold text-lg">{q.nombre}</p>
                              <p className="text-gray-600">{q.documento} • {q.pais}</p>
                            </div>
                            <p className="text-sm text-gray-600">Verifique los antecedentes del pasajero con la base de datos nacional y sistemas internacionales.</p>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                              <Button className="bg-[#14883F] hover:bg-[#0f6830] text-white h-12" onClick={() => handleValidation(q.id, 'Validado')}>Aprobar Ingreso</Button>
                              <Button variant="destructive" className="bg-[#D52B1E] hover:bg-[#b52418] h-12" onClick={() => handleValidation(q.id, 'Observado')}>Observar / Retener</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-12">Cola migratoria vacía</TableCell>
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