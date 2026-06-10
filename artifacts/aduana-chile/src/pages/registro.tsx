import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { formatRut, validateRut } from "@/lib/masks";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const schema = z.object({
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
  correo: z.string().email("Ingrese un correo electrónico válido (ej: nombre@correo.com)"),
  contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmarContrasena: z.string(),
}).refine((d) => d.contrasena === d.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
});

type FormData = z.infer<typeof schema>;

export default function Registro() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit, formState: { errors, touchedFields }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registro de Viajero</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <div className="relative">
                    <Input 
                      id="nombre" 
                      {...register("nombre")} 
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                    />
                    {touchedFields.nombre && !errors.nombre && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.nombre && (
                    <p id="nombre-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.nombre.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <div className="relative">
                    <Input 
                      id="apellido" 
                      {...register("apellido")} 
                      aria-invalid={!!errors.apellido}
                      aria-describedby={errors.apellido ? "apellido-error" : undefined}
                    />
                    {touchedFields.apellido && !errors.apellido && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.apellido && (
                    <p id="apellido-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.apellido.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rut">RUT o Pasaporte</Label>
                  <div className="relative">
                    <Input 
                      id="rut" 
                      {...register("rut")} 
                      onChange={handleRutChange}
                      placeholder="12.345.678-9"
                      aria-invalid={!!errors.rut}
                      aria-describedby={errors.rut ? "rut-error" : undefined}
                    />
                    {touchedFields.rut && !errors.rut && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.rut && (
                    <p id="rut-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.rut.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nacionalidad">Nacionalidad</Label>
                  <div className="relative">
                    <Input 
                      id="nacionalidad" 
                      {...register("nacionalidad")} 
                      aria-invalid={!!errors.nacionalidad}
                      aria-describedby={errors.nacionalidad ? "nacionalidad-error" : undefined}
                    />
                    {touchedFields.nacionalidad && !errors.nacionalidad && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.nacionalidad && (
                    <p id="nacionalidad-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.nacionalidad.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                  <div className="relative">
                    <Input 
                      id="fechaNacimiento" 
                      type="date" 
                      {...register("fechaNacimiento")} 
                      aria-invalid={!!errors.fechaNacimiento}
                      aria-describedby={errors.fechaNacimiento ? "fechaNacimiento-error" : undefined}
                    />
                    {touchedFields.fechaNacimiento && !errors.fechaNacimiento && <CheckCircle2 className="absolute right-8 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.fechaNacimiento && (
                    <p id="fechaNacimiento-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.fechaNacimiento.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  <div className="relative">
                    <Input 
                      id="correo" 
                      type="email" 
                      {...register("correo")} 
                      aria-invalid={!!errors.correo}
                      aria-describedby={errors.correo ? "correo-error" : undefined}
                    />
                    {touchedFields.correo && !errors.correo && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.correo && (
                    <p id="correo-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.correo.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña</Label>
                  <div className="relative">
                    <Input 
                      id="contrasena" 
                      type="password" 
                      {...register("contrasena")} 
                      aria-invalid={!!errors.contrasena}
                      aria-describedby={errors.contrasena ? "contrasena-error" : undefined}
                    />
                    {touchedFields.contrasena && !errors.contrasena && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.contrasena && (
                    <p id="contrasena-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.contrasena.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarContrasena">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Input 
                      id="confirmarContrasena" 
                      type="password" 
                      {...register("confirmarContrasena")} 
                      aria-invalid={!!errors.confirmarContrasena}
                      aria-describedby={errors.confirmarContrasena ? "confirmarContrasena-error" : undefined}
                    />
                    {touchedFields.confirmarContrasena && !errors.confirmarContrasena && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-green-500" />}
                  </div>
                  {errors.confirmarContrasena && (
                    <p id="confirmarContrasena-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> {errors.confirmarContrasena.message}
                    </p>
                  )}
                </div>

              </div>
              <Button type="submit" className="w-full">Registrarse</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}