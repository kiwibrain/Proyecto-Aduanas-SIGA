import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function ViajeroDashboard() {
  const tramites = [
    { id: "AD-2025-001", tipo: "Declaración de Productos", fecha: "10/06/2025", estado: "En Revisión" },
    { id: "AV-2025-032", tipo: "Registro de Vehículo", fecha: "08/06/2025", estado: "Aprobado" },
    { id: "AM-2025-011", tipo: "Autorización de Menor", fecha: "05/06/2025", estado: "Pendiente" }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Portal del Viajero</h1>
        
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
    </Layout>
  );
}