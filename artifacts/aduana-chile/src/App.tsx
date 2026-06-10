import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Registro from "@/pages/registro";
import ViajeroDashboard from "@/pages/viajero/dashboard";
import DeclararProductos from "@/pages/viajero/declarar-productos";
import RegistrarVehiculo from "@/pages/viajero/registrar-vehiculo";
import AutorizacionMenor from "@/pages/viajero/autorizacion-menor";
import EstadoTramite from "@/pages/viajero/estado-tramite";
import Notificaciones from "@/pages/viajero/notificaciones";
import AduanaDashboard from "@/pages/funcionario/aduana/dashboard";
import AduanaReportes from "@/pages/funcionario/aduana/reportes";
import PDIDashboard from "@/pages/funcionario/pdi/dashboard";
import SAGDashboard from "@/pages/funcionario/sag/dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Registro} />
      <Route path="/viajero" component={ViajeroDashboard} />
      <Route path="/viajero/declarar-productos" component={DeclararProductos} />
      <Route path="/viajero/registrar-vehiculo" component={RegistrarVehiculo} />
      <Route path="/viajero/autorizacion-menor" component={AutorizacionMenor} />
      <Route path="/viajero/estado-tramite" component={EstadoTramite} />
      <Route path="/viajero/notificaciones" component={Notificaciones} />
      <Route path="/funcionario/aduana" component={AduanaDashboard} />
      <Route path="/funcionario/aduana/reportes" component={AduanaReportes} />
      <Route path="/funcionario/pdi" component={PDIDashboard} />
      <Route path="/funcionario/sag" component={SAGDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;