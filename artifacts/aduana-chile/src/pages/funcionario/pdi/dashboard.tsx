import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

interface PDIEntry {
  id: number;
  nombre: string;
  documento: string;
  tipoDocumento: string;
  pais: string;
  fechaNacimiento: string;
  sexo: string;
  motivoViaje: string;
  vigenciaDocumento: string;
  ingresosPrevios: string;
  alertas: string;
  estado: string;
}

export default function PDIDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<PDIEntry[]>([
    {
      id: 1,
      nombre: "Roberto Gómez",
      documento: "PAS-89211442",
      tipoDocumento: "Pasaporte",
      pais: "Argentina",
      fechaNacimiento: "15/03/1985",
      sexo: "Masculino",
      motivoViaje: "Turismo",
      vigenciaDocumento: "2028",
      ingresosPrevios: "3 registros en el último año",
      alertas: "Ninguna",
      estado: "Esperando"
    },
    {
      id: 2,
      nombre: "Laura Silva",
      documento: "15.221.849-K",
      tipoDocumento: "Cédula de Identidad",
      pais: "Chile",
      fechaNacimiento: "08/09/1992",
      sexo: "Femenino",
      motivoViaje: "Visita familiar",
      vigenciaDocumento: "2029",
      ingresosPrevios: "12 registros en el último año",
      alertas: "Ninguna",
      estado: "Esperando"
    },
    {
      id: 3,
      nombre: "Marco Ricci",
      documento: "IT-X9821003",
      tipoDocumento: "Pasaporte UE",
      pais: "Italia",
      fechaNacimiento: "22/11/1975",
      sexo: "Masculino",
      motivoViaje: "Negocios",
      vigenciaDocumento: "2027",
      ingresosPrevios: "Sin registros previos",
      alertas: "Verificar con Interpol",
      estado: "Esperando"
    }
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
              <p className="text-sm font-medium text-gray-500">Alertas Interpol</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">1</p>
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
                  <TableHead className="pl-6">Nombre</TableHead>
                  <TableHead>N° Documento</TableHead>
                  <TableHead>Tipo Doc.</TableHead>
                  <TableHead>País Origen</TableHead>
                  <TableHead>Alertas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id} className={q.alertas !== "Ninguna" ? "bg-red-50/20" : ""}>
                    <TableCell className="pl-6 font-semibold">{q.nombre}</TableCell>
                    <TableCell className="font-mono text-sm">{q.documento}</TableCell>
                    <TableCell className="text-gray-600 text-sm">{q.tipoDocumento}</TableCell>
                    <TableCell>{q.pais}</TableCell>
                    <TableCell>
                      {q.alertas === "Ninguna"
                        ? <span className="text-xs text-gray-400">—</span>
                        : <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">{q.alertas}</Badge>
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">{q.estado}</Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-[#0032A0] hover:bg-[#00205B] text-white">Validar</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-xl">Confirmar Identidad</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="bg-gray-50 rounded-lg p-3 border col-span-2">
                                <p className="font-bold text-lg">{q.nombre}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{q.tipoDocumento} · {q.documento}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">País de origen</p>
                                <p className="font-semibold">{q.pais}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">Sexo</p>
                                <p className="font-semibold">{q.sexo}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">Fecha de nacimiento</p>
                                <p className="font-semibold">{q.fechaNacimiento}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">Vigencia doc.</p>
                                <p className="font-semibold">{q.vigenciaDocumento}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">Motivo de viaje</p>
                                <p className="font-semibold">{q.motivoViaje}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3 border">
                                <p className="text-xs text-gray-500 mb-0.5">Ingresos previos</p>
                                <p className="font-semibold text-xs">{q.ingresosPrevios}</p>
                              </div>
                              {q.alertas !== "Ninguna" && (
                                <div className="bg-red-50 rounded-lg p-3 border border-red-200 col-span-2">
                                  <p className="text-xs text-red-600 font-bold mb-0.5">⚠ ALERTA</p>
                                  <p className="font-semibold text-red-700">{q.alertas}</p>
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                              <Button className="bg-[#14883F] hover:bg-[#0f6830] text-white h-12" onClick={() => handleValidation(q.id, 'Validado')}>
                                Aprobar Ingreso
                              </Button>
                              <Button variant="destructive" className="bg-[#D52B1E] hover:bg-[#b52418] h-12" onClick={() => handleValidation(q.id, 'Observado')}>
                                Observar / Retener
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {queue.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-12">Cola migratoria vacía</TableCell>
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
