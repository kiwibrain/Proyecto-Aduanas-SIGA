import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Bell, Download, QrCode, FileText, Car, UserCheck, Search } from "lucide-react";
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
      <div className="-mx-4 -mt-8 mb-8">
        <section className="hero-gradient text-white py-12 px-4 shadow-sm">
          <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-1">Bienvenido, Juan Pérez</h1>
              <p className="text-white/80 text-sm">RUT: 12.345.678-9 | Sesión activa</p>
            </div>
            <Link href="/viajero/notificaciones">
              <Button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white relative">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D52B1E] text-[10px] font-bold text-white shadow">
                  2
                </span>
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link href="/viajero/declarar-productos">
            <Card className="card-blue-accent hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="bg-blue-50 text-[#0032A0] p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Declarar Productos</h3>
                  <p className="text-sm text-gray-500">Declaración jurada de ingreso SAG</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/viajero/registrar-vehiculo">
            <Card className="card-red-accent hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="bg-red-50 text-[#D52B1E] p-3 rounded-lg">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Registrar Vehículo</h3>
                  <p className="text-sm text-gray-500">Ingreso temporal o definitivo</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/viajero/autorizacion-menor">
            <Card className="card-green-accent hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="bg-green-50 text-[#14883F] p-3 rounded-lg">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Autorización Menor</h3>
                  <p className="text-sm text-gray-500">Permiso de viaje para menores</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/viajero/estado-tramite">
            <Card className="card-amber-accent hover:shadow-md transition-shadow cursor-pointer h-full bg-[#F7F8FA] border-gray-200">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="bg-amber-100 text-[#F59E0B] p-3 rounded-lg">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Consultar Estado</h3>
                  <p className="text-sm text-gray-500">Seguimiento de sus trámites</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-sm border-gray-100">
              <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                <CardTitle className="text-lg text-gray-800">Mis Trámites Activos</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="pl-6">N° Trámite</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="pr-6">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tramites.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-semibold pl-6">{t.id}</TableCell>
                        <TableCell className="text-gray-600">{t.tipo}</TableCell>
                        <TableCell className="text-gray-500">{t.fecha}</TableCell>
                        <TableCell className="pr-6">
                          <Badge variant={t.estado === "Aprobado" ? "default" : t.estado === "En Revisión" ? "secondary" : "outline"}
                                 className={
                                   t.estado === "Aprobado" ? "bg-[#14883F] hover:bg-[#0f6830]" : 
                                   t.estado === "En Revisión" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                                   "bg-amber-100 text-amber-800 hover:bg-amber-100 border-0"
                                 }>
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
            <Card className="bg-[#00205B] text-white shadow-md border-0">
              <CardHeader className="pb-4 border-b border-white/10">
                <CardTitle className="text-lg flex items-center gap-2 text-white"><QrCode className="h-5 w-5" /> Código QR Activo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-5 pt-6">
                <p className="text-sm text-center text-white/80">Trámite Aprobado: <strong className="text-white">AV-2025-032</strong></p>
                <div className="p-4 bg-white rounded-xl shadow-inner">
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
                <Button className="w-full bg-white text-[#00205B] hover:bg-gray-100 font-bold" onClick={() => toast({ title: "Descargando", description: "Comprobante descargado en PDF" })}>
                  <Download className="mr-2 h-4 w-4" /> Descargar Pase
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}