import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";

type Notificacion = {
  id: number;
  mensaje: string;
  fechaEnvio: string;
  leido: boolean;
};

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    { id: 1, mensaje: "Su declaración AD-2025-001 está siendo revisada por el funcionario SAG.", fechaEnvio: "10/06/2025 09:45", leido: false },
    { id: 2, mensaje: "Su vehículo AV-2025-032 ha sido aprobado para ingreso al país.", fechaEnvio: "08/06/2025 14:20", leido: true },
    { id: 3, mensaje: "Se requiere corrección en su autorización de menor AM-2025-011. Por favor adjunte documento actualizado.", fechaEnvio: "05/06/2025 11:10", leido: false }
  ]);

  const toggleLeido = (id: number) => {
    setNotificaciones(notificaciones.map(n => 
      n.id === id ? { ...n, leido: !n.leido } : n
    ));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-7 w-7" /> Notificaciones
          </h1>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {notificaciones.map(n => (
                <div 
                  key={n.id} 
                  className={`p-6 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${n.leido ? 'bg-white' : 'bg-blue-50/50 border-l-4 border-l-blue-600'}`}
                >
                  <div className="space-y-1">
                    <p className={`text-sm ${n.leido ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {n.mensaje}
                    </p>
                    <p className="text-xs text-gray-400">{n.fechaEnvio}</p>
                  </div>
                  <Button 
                    variant={n.leido ? "ghost" : "outline"} 
                    size="sm" 
                    onClick={() => toggleLeido(n.id)}
                    className="flex-shrink-0"
                  >
                    {n.leido ? "Marcar como no leído" : <><CheckCircle2 className="mr-2 h-4 w-4" /> Marcar como leído</>}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}