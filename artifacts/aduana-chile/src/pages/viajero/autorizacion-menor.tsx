import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { formatRut, validateRut } from "@/lib/masks";
import { AlertCircle, CheckCircle2, Upload, File as FileIcon, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";

export default function AutorizacionMenor() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;

  const [nombreMenor, setNombreMenor] = useState("");
  const [rutMenor, setRutMenor] = useState("");
  const [rutMenorValido, setRutMenorValido] = useState<boolean | null>(null);
  const [fechaNacimientoMenor, setFechaNacimientoMenor] = useState("");

  const [nombreTutor, setNombreTutor] = useState("");
  const [rutTutor, setRutTutor] = useState("");
  const [rutTutorValido, setRutTutorValido] = useState<boolean | null>(null);
  const [relacion, setRelacion] = useState("");
  const [fechaViaje, setFechaViaje] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [confirmoOriginal, setConfirmoOriginal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRutMenorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setRutMenor(formatted);
    setRutMenorValido(formatted.length > 5 ? validateRut(formatted) : null);
  };

  const handleRutTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setRutTutor(formatted);
    setRutTutorValido(formatted.length > 5 ? validateRut(formatted) : null);
  };

  const nextStep1 = () => {
    if (!nombreMenor || !rutMenor || !fechaNacimientoMenor) {
      toast({ title: "Error", description: "Complete todos los campos", variant: "destructive" });
      return;
    }
    if (rutMenorValido === false) {
      toast({ title: "Error", description: "El RUT del menor no es válido", variant: "destructive" });
      return;
    }
    const d = new Date(fechaNacimientoMenor);
    const now = new Date();
    const age = now.getFullYear() - d.getFullYear();
    if (age >= 18) {
      toast({ title: "Error", description: "El menor debe tener menos de 18 años", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const nextStep2 = () => {
    if (!nombreTutor || !rutTutor || !relacion || !fechaViaje) {
      toast({ title: "Error", description: "Complete todos los campos", variant: "destructive" });
      return;
    }
    if (rutTutorValido === false) {
      toast({ title: "Error", description: "El RUT del acompañante no es válido", variant: "destructive" });
      return;
    }
    const viajed = new Date(fechaViaje);
    if (viajed < new Date()) {
      toast({ title: "Error", description: "La fecha de viaje debe ser futura", variant: "destructive" });
      return;
    }
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Error", description: "Debe adjuntar la autorización notarial en formato PDF", variant: "destructive" });
      return;
    }
    if (!confirmoOriginal) {
      toast({ title: "Error", description: "Debe confirmar que el documento es original", variant: "destructive" });
      return;
    }
    setIsSubmitted(true);
    toast({ title: "Autorización enviada", description: "El documento ha sido cargado exitosamente para revisión." });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <Card>
            <CardHeader><CardTitle className="text-2xl text-green-700">Trámite Ingresado</CardTitle></CardHeader>
            <CardContent>
              <p>Su solicitud de autorización de menor ha sido ingresada. Se le notificará cuando haya sido revisada.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/viajero" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0032A0] transition-colors">
          <ChevronLeft className="h-4 w-4" /> Volver a mi panel
        </Link>
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {step === 1 && "Paso 1 de 3: Datos del Menor"}
            {step === 2 && "Paso 2 de 3: Datos del Acompañante"}
            {step === 3 && "Paso 3 de 3: Documento Notarial"}
          </h1>
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <Card>
          <CardContent className="pt-6">
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreMenor">Nombre completo del menor</Label>
                    <Input id="nombreMenor" value={nombreMenor} onChange={(e) => setNombreMenor(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rutMenor">RUT del menor</Label>
                    <div className="relative">
                      <Input 
                        id="rutMenor" 
                        value={rutMenor} 
                        onChange={handleRutMenorChange} 
                        aria-invalid={rutMenorValido === false}
                        aria-describedby={rutMenorValido === false ? "rutMenor-error" : undefined}
                      />
                      {rutMenorValido && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                    </div>
                    {rutMenorValido === false && (
                      <p id="rutMenor-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> El RUT ingresado no es válido (ej: 12.345.678-9)
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimientoMenor">Fecha de nacimiento</Label>
                    <Input id="fechaNacimientoMenor" type="date" value={fechaNacimientoMenor} onChange={(e) => setFechaNacimientoMenor(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep1}>Siguiente →</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreTutor">Nombre del tutor/acompañante</Label>
                    <Input id="nombreTutor" value={nombreTutor} onChange={(e) => setNombreTutor(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rutTutor">RUT del acompañante</Label>
                    <div className="relative">
                      <Input 
                        id="rutTutor" 
                        value={rutTutor} 
                        onChange={handleRutTutorChange} 
                        aria-invalid={rutTutorValido === false}
                        aria-describedby={rutTutorValido === false ? "rutTutor-error" : undefined}
                      />
                      {rutTutorValido && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                    </div>
                    {rutTutorValido === false && (
                      <p id="rutTutor-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> El RUT ingresado no es válido (ej: 12.345.678-9)
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relacion">Relación con el menor</Label>
                    <Select value={relacion} onValueChange={setRelacion}>
                      <SelectTrigger id="relacion"><SelectValue placeholder="Seleccione relación" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Padre">Padre</SelectItem>
                        <SelectItem value="Madre">Madre</SelectItem>
                        <SelectItem value="Abuelo(a)">Abuelo(a)</SelectItem>
                        <SelectItem value="Tío(a)">Tío(a)</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaViaje">Fecha programada de viaje</Label>
                    <Input id="fechaViaje" type="date" value={fechaViaje} onChange={(e) => setFechaViaje(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>← Anterior</Button>
                  <Button onClick={nextStep2}>Siguiente →</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border text-sm">
                  <h3 className="font-semibold mb-2">Resumen</h3>
                  <p><strong>Menor:</strong> {nombreMenor} ({rutMenor})</p>
                  <p><strong>Acompañante:</strong> {nombreTutor} ({rutTutor}) - {relacion}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Documento Notarial (PDF)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50 relative cursor-pointer hover:bg-gray-100 transition-colors"
                       onClick={() => {
                         // Mock file selection
                         const mockFile = new window.File([""], "autorizacion_notarial.pdf", { type: "application/pdf" });
                         setFile(mockFile);
                       }}>
                    {file ? (
                      <div className="flex flex-col items-center">
                        <FileIcon className="h-8 w-8 text-blue-500 mb-2" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500 mt-1">Haz clic para cambiar archivo</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 font-medium">Haga clic para seleccionar archivo PDF</p>
                        <p className="text-xs text-gray-500 mt-1">Debe adjuntar la autorización notarial en formato PDF</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox id="confirmoOriginal" checked={confirmoOriginal} onCheckedChange={(c) => setConfirmoOriginal(!!c)} />
                  <Label htmlFor="confirmoOriginal" className="leading-tight">
                    Confirmo que el documento adjunto es la autorización notarial original
                  </Label>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>← Anterior</Button>
                  <Button onClick={handleSubmit}>Enviar Documentación</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}