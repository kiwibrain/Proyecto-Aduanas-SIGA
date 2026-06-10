import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Download, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Textarea } from "@/components/ui/textarea";

export default function DeclararProductos() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([
    { desc: "Laptop MacBook Pro", cant: 1, valor: 1200, pais: "USA", cat: "Electrónica" }
  ]);
  const [sagAlimentos, setSagAlimentos] = useState(false);
  const [sagAnimales, setSagAnimales] = useState(false);
  const [sagPlantas, setSagPlantas] = useState(false);
  const [sagProcesados, setSagProcesados] = useState(false);
  const [sagDetalle, setSagDetalle] = useState("");
  const [declaracionJurada, setDeclaracionJurada] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasSagChecked = sagAlimentos || sagAnimales || sagPlantas || sagProcesados;
  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;
  
  const [newItem, setNewItem] = useState({ desc: "", cant: 1, valor: "", pais: "", cat: "" });

  const addItem = () => {
    if (!newItem.desc || !newItem.valor || !newItem.cat) {
      toast({ title: "Error", description: "Complete los campos obligatorios del producto", variant: "destructive" });
      return;
    }
    setItems([...items, { ...newItem, valor: Number(newItem.valor) }]);
    setNewItem({ desc: "", cant: 1, valor: "", pais: "", cat: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declaracionJurada) {
      toast({ title: "Error", description: "Debe aceptar la declaración jurada", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    toast({ title: "Declaración enviada", description: "Su declaración ha sido registrada exitosamente." });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-8 text-center mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">¡Declaración Exitosa!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex flex-col items-center">
              <p>Muestre este código QR al funcionario en el control fronterizo.</p>
              <div className="p-4 bg-white border border-gray-200 inline-block rounded-lg shadow-sm">
                <svg width="200" height="200" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
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
                <p className="mt-2 font-mono font-bold">QR-AD2025XXX</p>
              </div>
              <Button onClick={() => toast({ title: "Descargando", description: "Comprobante descargado" })}>
                <Download className="mr-2 h-4 w-4" /> Descargar comprobante PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/viajero" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0032A0] transition-colors">
          <ChevronLeft className="h-4 w-4" /> Volver a mi panel
        </Link>
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {step === 1 && "Paso 1 de 3: Declaración SAG"}
            {step === 2 && "Paso 2 de 3: Artículos a ingresar al país"}
            {step === 3 && "Paso 3 de 3: Resumen de la declaración"}
          </h1>
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <Card>
          <CardContent className="pt-6">
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="sagAlimentos" checked={sagAlimentos} onCheckedChange={(c) => setSagAlimentos(!!c)} />
                    <Label htmlFor="sagAlimentos" className="leading-tight flex items-center gap-2">
                      ¿Transporta alimentos, frutas o vegetales frescos?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600"><HelpCircle className="h-4 w-4" /></button>
                          </TooltipTrigger>
                          <TooltipContent><p className="max-w-xs">Incluye frutas, verduras, granos, semillas, productos lácteos y carnes. Deben declararse aunque sean para consumo personal.</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="sagAnimales" checked={sagAnimales} onCheckedChange={(c) => setSagAnimales(!!c)} />
                    <Label htmlFor="sagAnimales" className="leading-tight flex items-center gap-2">
                      ¿Transporta animales o mascotas vivas?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600"><HelpCircle className="h-4 w-4" /></button>
                          </TooltipTrigger>
                          <TooltipContent><p className="max-w-xs">Incluye perros, gatos, aves y cualquier animal vivo. Se requiere certificado veterinario.</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="sagPlantas" checked={sagPlantas} onCheckedChange={(c) => setSagPlantas(!!c)} />
                    <Label htmlFor="sagPlantas" className="leading-tight flex items-center gap-2">
                      ¿Transporta plantas, flores o material vegetal?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600"><HelpCircle className="h-4 w-4" /></button>
                          </TooltipTrigger>
                          <TooltipContent><p className="max-w-xs">Incluye flores, plantas en maceta, semillas y tierra. Algunos están prohibidos por regulación fitosanitaria.</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox id="sagProcesados" checked={sagProcesados} onCheckedChange={(c) => setSagProcesados(!!c)} />
                    <Label htmlFor="sagProcesados" className="leading-tight flex items-center gap-2">
                      ¿Transporta productos de origen animal procesados?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600"><HelpCircle className="h-4 w-4" /></button>
                          </TooltipTrigger>
                          <TooltipContent><p className="max-w-xs">Incluye embutidos, quesos curados, miel, lana cruda. Revisar lista de productos permitidos.</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                </div>

                {hasSagChecked && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sagDetalle">Detalle los productos</Label>
                      <Textarea id="sagDetalle" value={sagDetalle} onChange={(e) => setSagDetalle(e.target.value)} placeholder="Ej: Manzanas, queso fresco..." />
                    </div>
                    <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start gap-3 border border-amber-200">
                      <HelpCircle className="h-5 w-5 mt-0.5 text-amber-600" />
                      <p className="text-sm font-medium">⚠ Los productos marcados serán revisados por un funcionario SAG en el cruce fronterizo.</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)}>Siguiente →</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-2">
                    <Label>Descripción del artículo</Label>
                    <Input placeholder="Ej: Cámara fotográfica" value={newItem.desc} onChange={(e) => setNewItem({...newItem, desc: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Cantidad</Label>
                    <Input type="number" min="1" value={newItem.cant} onChange={(e) => setNewItem({...newItem, cant: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">Valor declarado (USD)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400"><HelpCircle className="h-4 w-4" /></button>
                          </TooltipTrigger>
                          <TooltipContent><p className="max-w-xs">Debe declarar el valor real de compra. Bienes sobre USD 500 pueden estar sujetos a arancel.</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input type="number" step="0.01" value={newItem.valor} onChange={(e) => setNewItem({...newItem, valor: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>País de origen</Label>
                    <Input value={newItem.pais} onChange={(e) => setNewItem({...newItem, pais: e.target.value})} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Categoría</Label>
                    <Select value={newItem.cat} onValueChange={(v) => setNewItem({...newItem, cat: v})}>
                      <SelectTrigger><SelectValue placeholder="Seleccione categoría" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electrónica">Electrónica</SelectItem>
                        <SelectItem value="Ropa">Ropa</SelectItem>
                        <SelectItem value="Alimentos">Alimentos</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="button" variant="secondary" onClick={addItem}>Agregar Artículo</Button>
                  </div>
                </div>

                {items.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Cant.</TableHead>
                        <TableHead>Valor (USD)</TableHead>
                        <TableHead>Origen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((i, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{i.desc}</TableCell>
                          <TableCell>{i.cat}</TableCell>
                          <TableCell>{i.cant}</TableCell>
                          <TableCell>${i.valor}</TableCell>
                          <TableCell>{i.pais}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>← Anterior</Button>
                  <Button onClick={() => setStep(3)}>Siguiente →</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Declaración SAG</CardTitle></CardHeader>
                    <CardContent>
                      {hasSagChecked ? (
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {sagAlimentos && <li>Alimentos frescos</li>}
                          {sagAnimales && <li>Animales vivos</li>}
                          {sagPlantas && <li>Plantas / flores</li>}
                          {sagProcesados && <li>Productos procesados</li>}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">Sin productos SAG declarados.</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Resumen de Artículos</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium">Total de artículos: {items.length}</p>
                      <p className="text-sm font-medium">Valor total: ${items.reduce((acc, curr) => acc + Number(curr.valor), 0).toFixed(2)} USD</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex items-start space-x-3 pt-4 border-t">
                  <Checkbox id="declaracionJurada" checked={declaracionJurada} onCheckedChange={(c) => setDeclaracionJurada(!!c)} />
                  <Label htmlFor="declaracionJurada" className="leading-tight">
                    Declaro bajo juramento que la información proporcionada es veraz y completa.
                  </Label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>← Anterior</Button>
                  <Button onClick={handleSubmit} disabled={!declaracionJurada}>Enviar Declaración ✓</Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}