import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Bell, Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ViajeroDashboard() {
  const { toast } = useToast();
  
  const tramites = [
    { id: "AD-2025-001", tipo: "Declaración de Productos", fecha: "10/06/2025", estado: "En Revisión" },
    { id: "AV-2025-032", tipo: "Registro de Vehículo", fecha: "08/06/2025", estado: "Aprobado" },
    { id: "AM-2025-011", tipo: "Autorización de Menor", fecha: "05/06/2025", estado: "Pendiente" }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Portal del Viajero</h1>
          <Link href="/viajero/notificaciones">
            <Button variant="outline" className="relative">
              <Bell className="h-5 w-5 mr-2" />
              Notificaciones
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                2
              </span>
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/viajero/declarar-productos">
            <Button className="w-full h-auto py-4 whitespace-normal text-left flex flex-col items-start gap-2">
              <span className="font-bold">Declarar Productos</span>
              <span className="text-xs opacity-80 font-normal">Declaración jurada de ingreso</span>
            </Button>
          </Link>
          <Link href="/viajero/registrar-vehiculo">
            <Button variant="outline" className="w-full h-auto py-4 whitespace-normal text-left flex flex-col items-start gap-2">
              <span className="font-bold">Registrar Vehículo</span>
              <span className="text-xs text-gray-500 font-normal">Ingreso temporal o definitivo</span>
            </Button>
          </Link>
          <Link href="/viajero/autorizacion-menor">
            <Button variant="outline" className="w-full h-auto py-4 whitespace-normal text-left flex flex-col items-start gap-2">
              <span className="font-bold">Autorización Menor</span>
              <span className="text-xs text-gray-500 font-normal">Permiso de viaje</span>
            </Button>
          </Link>
          <Link href="/viajero/estado-tramite">
            <Button variant="secondary" className="w-full h-auto py-4 whitespace-normal text-left flex flex-col items-start gap-2">
              <span className="font-bold">Consultar Estado</span>
              <span className="text-xs opacity-80 font-normal">Seguimiento de trámites</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mis Trámites Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Trámite</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tramites.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.id}</TableCell>
                        <TableCell>{t.tipo}</TableCell>
                        <TableCell>{t.fecha}</TableCell>
                        <TableCell>
                          <Badge variant={t.estado === "Aprobado" ? "default" : t.estado === "En Revisión" ? "secondary" : "outline"}
                                 className={t.estado === "Aprobado" ? "bg-green-600 hover:bg-green-700" : ""}>
                            {t.estado}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gray-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2"><QrCode className="h-5 w-5" /> Código QR del Trámite</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <p className="text-sm text-center text-gray-600">Trámite Aprobado: <strong>AV-2025-032</strong></p>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <svg width="150" height="150" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <rect width="10" height="10" fill="white" />
                    <rect x="1" y="1" width="3" height="3" fill="black" />
                    <rect x="6" y="1" width="3" height="3" fill="black" />
                    <rect x="1" y="6" width="3" height="3" fill="black" />
                    <rect x="2" y="2" width="1" height="1" fill="white" />
                    <rect x="7" y="2" width="1" height="1" fill="white" />
                    <rect x="2" y="7" width="1" height="1" fill="white" />
                    <rect x="5" y="5" width="2" height="1" fill="black" />
                    <rect x="7" y="6" width="1" height="2" fill="black" />
                    <rect x="5" y="7" width="1" height="2" fill="black" />
                    <rect x="8" y="8" width="1" height="1" fill="black" />
                  </svg>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Descargando", description: "Comprobante descargado" })}>
                  <Download className="mr-2 h-4 w-4" /> Descargar PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}