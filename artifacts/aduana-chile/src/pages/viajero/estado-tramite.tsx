import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function EstadoTramite() {
  const tramites = [
    { id: "AD-2025-001", tipo: "Declaración de Productos", fecha: "10/06/2025", estado: "En Revisión" },
    { id: "AV-2025-032", tipo: "Registro de Vehículo", fecha: "08/06/2025", estado: "Aprobado" },
    { id: "AM-2025-011", tipo: "Autorización de Menor", fecha: "05/06/2025", estado: "Pendiente" },
    { id: "AD-2024-892", tipo: "Declaración de Productos", fecha: "15/12/2024", estado: "Aprobado" }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Consultar Estado del Trámite</h1>
        <Card>
          <CardHeader>
            <CardTitle>Historial de Trámites</CardTitle>
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