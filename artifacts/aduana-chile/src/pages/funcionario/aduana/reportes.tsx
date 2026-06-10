import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileDown, Table2, BarChart3 } from "lucide-react";

export default function AduanaReportes() {
  const { toast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReport(true);
    toast({ title: "Reporte generado", description: "Mostrando resultados del periodo seleccionado." });
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    toast({ title: "Exportando", description: "Generando archivo Excel..." });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#00205B]">Generador de Reportes</h1>
            <p className="text-gray-500 text-sm mt-1">Filtre por período y tipo de trámite para generar el reporte.</p>
          </div>
          {showReport && (
            <div className="flex gap-3">
              <Button onClick={handleExportPDF} className="bg-[#D52B1E] hover:bg-[#b52418] text-white">
                <FileDown className="mr-2 h-4 w-4" /> Exportar PDF
              </Button>
              <Button onClick={handleExportExcel} className="bg-[#14883F] hover:bg-[#0f6830] text-white">
                <Table2 className="mr-2 h-4 w-4" /> Exportar Excel
              </Button>
            </div>
          )}
        </div>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-gray-500" /> Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <Label>Fecha Desde</Label>
                <Input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  value={fechaDesde}
                  onChange={e => setFechaDesde(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha Hasta</Label>
                <Input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  value={fechaHasta}
                  onChange={e => setFechaHasta(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo Trámite</Label>
                <Select defaultValue="todos">
                  <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="declaracion">Declaración</SelectItem>
                    <SelectItem value="vehiculo">Vehículo</SelectItem>
                    <SelectItem value="autorizacion">Autorización Menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select defaultValue="todos">
                  <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-[#0032A0] hover:bg-[#00205B]">
                Generar Reporte
              </Button>
            </form>
          </CardContent>
        </Card>

        {showReport && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-black text-[#0032A0]">177</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Total Procesados</p>
                <p className="text-xs text-gray-400 mt-0.5">{fechaDesde} — {fechaHasta}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-black text-green-600">170</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Finalizados</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-black text-red-600">7</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Rechazados</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-black text-amber-600">96%</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Tasa de Aprobación</p>
              </div>
            </div>

            <Card className="shadow-sm border-gray-100 overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100">
                <CardTitle>Resultados del Periodo</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="pl-6">Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Total Procesados</TableHead>
                      <TableHead>Finalizados</TableHead>
                      <TableHead className="pr-6">Rechazados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="pl-6 font-medium">10/06/2025</TableCell>
                      <TableCell>Declaración Productos</TableCell>
                      <TableCell className="font-semibold text-gray-700">145</TableCell>
                      <TableCell className="text-[#14883F] font-bold">140</TableCell>
                      <TableCell className="text-[#D52B1E] font-bold pr-6">5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-6 font-medium">10/06/2025</TableCell>
                      <TableCell>Registro Vehículo</TableCell>
                      <TableCell className="font-semibold text-gray-700">32</TableCell>
                      <TableCell className="text-[#14883F] font-bold">30</TableCell>
                      <TableCell className="text-[#D52B1E] font-bold pr-6">2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
