import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { formatRut, validateRut } from "@/lib/masks";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const schema = z.object({
  tipoUsuario: z.enum(["viajero", "funcionario"]),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  rut: z.string().refine((val) => validateRut(val), "El RUT ingresado no es válido (ej: 12.345.678-9)"),
  nacionalidad: z.string().min(2, "Ingrese su nacionalidad"),
  fechaNacimiento: z.string().refine((val) => {
    const d = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - d.getFullYear();
    return age >= 0 && age <= 120;
  }, "Ingrese una fecha de nacimiento válida"),
  correo: z.string().email("Ingrese un correo válido"),
  contrasena: z.string().min(8, "Al menos 8 caracteres"),
  confirmarContrasena: z.string(),
  // Funcionario fields
  cargo: z.string().optional(),
  oficina: z.string().optional(),
  codigoFuncionario: z.string().optional(),
}).refine((d) => d.contrasena === d.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
}).refine((d) => d.tipoUsuario !== "funcionario" || !!d.cargo, {
  message: "Seleccione un cargo",
  path: ["cargo"],
}).refine((d) => d.tipoUsuario !== "funcionario" || !!d.oficina, {
  message: "Ingrese una oficina",
  path: ["oficina"],
}).refine((d) => d.tipoUsuario !== "funcionario" || !!d.codigoFuncionario, {
  message: "Ingrese su código de funcionario",
  path: ["codigoFuncionario"],
});

type FormData = z.infer<typeof schema>;

export default function Registro() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit, formState: { errors, touchedFields }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { tipoUsuario: "viajero" }
  });

  const tipoUsuario = watch("tipoUsuario");

  const onSubmit = (data: FormData) => {
    setLocation("/login");
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setValue("rut", formatted, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="border-t-4 border-t-[#0032A0] shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold text-gray-900">Registro en Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button 
                  type="button"
                  onClick={() => setValue("tipoUsuario", "viajero")}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${tipoUsuario === "viajero" ? "bg-white shadow text-[#0032A0]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Soy Viajero
                </button>
                <button 
                  type="button"
                  onClick={() => setValue("tipoUsuario", "funcionario")}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${tipoUsuario === "funcionario" ? "bg-white shadow text-[#0032A0]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Soy Funcionario
                </button>
              </div>
            </div>

            {tipoUsuario === "funcionario" && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-6 text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>El registro de funcionarios requiere validación por el organismo correspondiente. Se le enviará un correo de confirmación una vez aprobado.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <div className="relative">
                    <Input id="nombre" {...register("nombre")} />
                    {touchedFields.nombre && !errors.nombre && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.nombre && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.nombre.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <div className="relative">
                    <Input id="apellido" {...register("apellido")} />
                    {touchedFields.apellido && !errors.apellido && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.apellido && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.apellido.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rut">RUT o Pasaporte</Label>
                  <div className="relative">
                    <Input id="rut" {...register("rut")} onChange={handleRutChange} placeholder="12.345.678-9" />
                    {touchedFields.rut && !errors.rut && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.rut && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.rut.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nacionalidad">Nacionalidad</Label>
                  <div className="relative">
                    <Input id="nacionalidad" {...register("nacionalidad")} />
                    {touchedFields.nacionalidad && !errors.nacionalidad && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.nacionalidad && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.nacionalidad.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha Nacimiento</Label>
                  <div className="relative">
                    <Input id="fechaNacimiento" type="date" {...register("fechaNacimiento")} />
                    {touchedFields.fechaNacimiento && !errors.fechaNacimiento && <CheckCircle2 className="absolute right-8 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.fechaNacimiento && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.fechaNacimiento.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  <div className="relative">
                    <Input id="correo" type="email" {...register("correo")} />
                    {touchedFields.correo && !errors.correo && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.correo && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.correo.message}</p>}
                </div>

                {tipoUsuario === "funcionario" && (
                  <>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cargo">Institución / Cargo</Label>
                      <Select onValueChange={(val) => setValue("cargo", val)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione Institución" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aduana">Servicio Nacional de Aduanas</SelectItem>
                          <SelectItem value="pdi">Policía de Investigaciones (PDI)</SelectItem>
                          <SelectItem value="sag">Servicio Agrícola y Ganadero (SAG)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.cargo && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.cargo.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="oficina">Oficina / Paso Fronterizo</Label>
                      <Input id="oficina" {...register("oficina")} placeholder="Ej: Paso Los Libertadores" />
                      {errors.oficina && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.oficina.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="codigoFuncionario">Código Funcionario</Label>
                      <Input id="codigoFuncionario" {...register("codigoFuncionario")} placeholder="Ej: F-12345" />
                      {errors.codigoFuncionario && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.codigoFuncionario.message}</p>}
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña</Label>
                  <div className="relative">
                    <Input id="contrasena" type="password" {...register("contrasena")} />
                  </div>
                  {errors.contrasena && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.contrasena.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarContrasena">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Input id="confirmarContrasena" type="password" {...register("confirmarContrasena")} />
                  </div>
                  {errors.confirmarContrasena && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {errors.confirmarContrasena.message}</p>}
                </div>

              </div>
              <Button type="submit" className="w-full bg-[#0032A0] hover:bg-[#00205B] text-white">Registrarse</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}